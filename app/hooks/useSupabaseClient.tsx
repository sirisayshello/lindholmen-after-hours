import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Happening, Player, Teams, useGame } from "./useGame";

type CompletedQuestPayload = {
  team: Teams;
  questId: number;
};

type PlayerJoinedPayload = {
  name: string;
  team: Teams;
};

type GameStatePayload = {
  players: Player[];
};

type GamePlayPayload = {
  endTime: number;
};
type EndGamePayload = {
  team: Teams;
};
type HappeningPayload = {
  happening: Happening;
};

export const useSupabaseClient = (roomId: string) => {
  const game = useGame();
  const router = useRouter();

  const channel = supabase.channel(roomId);

  function questCompleted(payload: CompletedQuestPayload) {
    game.completeQuest(payload.team, payload.questId);
  }

  function handlePlay(payload: GamePlayPayload) {
    game.setEndTime(payload.endTime);
    router.push(`${roomId}/play`);
  }

  function updateGameState(payload: GameStatePayload) {
    // We have all players if we are the host
    if (game.isHost) {
      return;
    }

    game.updatePlayers(payload.players);
  }

  function endGameHandler(payload: EndGamePayload) {
    game.endGame(payload.team);
  }

  function handlePlayerJoined(payload: PlayerJoinedPayload) {
    game.addPlayer({
      name: payload.name,
      isReady: false,
      team: payload.team,
      isHost: false,
      isMe: false,
    });

    if (game.isHost) {
      sendGameState();
    }
  }

  function handleHappening(payload: HappeningPayload) {
    game.triggerHappening(payload.happening);
  }

  // Setting up listeners
  channel
    .on("broadcast", { event: "completed_quest" }, (payload) =>
      questCompleted(payload.payload as unknown as CompletedQuestPayload)
    )
    .on("broadcast", { event: "start_game" }, (payload) =>
      handlePlay(payload.payload as unknown as GamePlayPayload)
    )
    .on("broadcast", { event: "player_joined" }, (payload) =>
      handlePlayerJoined(payload.payload as unknown as PlayerJoinedPayload)
    )
    .on("broadcast", { event: "game_state" }, (payload) =>
      updateGameState(payload.payload as unknown as GameStatePayload)
    )
    .on("broadcast", { event: "end_game" }, (payload) =>
      endGameHandler(payload.payload as unknown as EndGamePayload)
    )
    .on("broadcast", { event: "happening" }, (payload) =>
      handleHappening(payload.payload as unknown as HappeningPayload)
    )
    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  const sendJoined = (name: string, team: Teams) => {
    game.setPlayerTeam(team);
    channel.send({
      type: "broadcast",
      event: "player_joined",
      payload: { name, team },
    });
  };

  const completeQuest = (team: Teams, questId: number) => {
    if (team === "Vampyrerna" && game.vampireScore === 0) {
      sendHappening("blodmåne");
    }

    game.completeQuest(team, questId);
    channel.send({
      type: "broadcast",
      event: "completed_quest",
      payload: { team, questId },
    });
  };

  const startGame = () => {
    const endTime = new Date().getTime() + 1000 * 60 * 40;
    channel.send({
      type: "broadcast",
      event: "start_game",
      payload: { endTime },
    });
    handlePlay({ endTime });
  };

  const endGame = () => {
    const winningTeam = game.playerTeam;
    game.endGame(winningTeam!);
    channel.send({
      type: "broadcast",
      event: "end_game",
      payload: { team: winningTeam },
    });
  };

  const sendHappening = (happening: Happening) => {
    channel.send({
      type: "broadcast",
      event: "happening",
      payload: { happening },
    });
  };

  const sendGameState = () => {
    channel.send({
      type: "broadcast",
      event: "game_state",
      payload: { players: game.players },
    });
  };

  return { sendJoined, completeQuest, startGame, endGame };
};
