import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Player, Teams, useGame } from "./useGame";

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

export const useSupabaseClient = (roomId: string) => {
  const game = useGame();
  const router = useRouter();

  // Join a room/topic. Can be anything except for 'realtime'.
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

  // Subscribe to the Channel
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

    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  // Join a room/topic. Can be anything except for 'realtime'.

  const sendJoined = (name: string, team: Teams) => {
    game.setPlayerTeam(team);
    channel.send({
      type: "broadcast",
      event: "player_joined",
      payload: { name, team },
    });
  };

  const completeQuest = (team: Teams, questId: number) => {
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

  const sendGameState = () => {
    channel.send({
      type: "broadcast",
      event: "game_state",
      payload: { players: game.players },
    });
  };

  return { sendJoined, completeQuest, startGame, endGame };
};
