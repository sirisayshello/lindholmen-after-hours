import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Player, Teams, useGame } from "./useGame";

type Events = "key_unlocked" | "join" | "start_game";

type UnlockedKeyPayload = {
  team: string;
  keyId: number;
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

export const useSupabaseClient = (roomId: string) => {
  const game = useGame();
  const router = useRouter();

  // Join a room/topic. Can be anything except for 'realtime'.
  const channel = supabase.channel(roomId);

  function keyUnlocked(payload: UnlockedKeyPayload) {
    console.log(`The ${payload.team} has unlocked key ${payload.keyId}`);
  }

  function handlePlay(payload: GamePlayPayload) {
    game.setEndTime(payload.endTime);
    router.push(`${roomId}/play`);
  }

  function updateGameState(payload: GameStatePayload) {
    console.log(payload);

    // We have all players if we are the host
    if (game.isHost) {
      return;
    }

    game.updatePlayers(payload.players);
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

    .on("broadcast", { event: "unlocked_key" }, (payload) =>
      keyUnlocked(payload.payload as unknown as UnlockedKeyPayload)
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

    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  // Join a room/topic. Can be anything except for 'realtime'.

  const sendJoined = (name: string, team: Teams) => {
    channel.send({
      type: "broadcast",
      event: "player_joined",
      payload: { name, team },
    });
  };

  const unlockedKey = (team: string, keyId: number) => {
    channel.send({
      type: "broadcast",
      event: "unlocked_key",
      payload: { team, keyId },
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

  const sendGameState = () => {
    channel.send({
      type: "broadcast",
      event: "game_state",
      payload: { players: game.players },
    });
  };

  return { sendJoined, unlockedKey, startGame };
};
