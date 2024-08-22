import { supabase } from "@/supabase/client";
import { Teams, useGame } from "./useGame";
import { ViewState } from "../page";

type Events = "key_unlocked" | "join" | "start_game";

type UnlockedKeyPayload = {
  team: string;
  keyId: number;
};

type PlayerJoinedPayload = {
  name: string;
  team: Teams;
};

type PlayerReadyPayload = {
  name: string;
  team: Teams;
};

type StartingGamePayload = {
  viewState: ViewState;
};

export const useSupabaseClient = (roomId: string) => {
  const game = useGame();

  // Join a room/topic. Can be anything except for 'realtime'.
  const channel = supabase.channel(roomId);

  // Simple function to log any messages we receive
  function messageReceived(payload: unknown) {
    console.log(payload);
  }

  function keyUnlocked(payload: UnlockedKeyPayload) {
    console.log(`The ${payload.team} has unlocked key ${payload.keyId}`);
  }

  function startingGame(payload: StartingGamePayload) {
    console.log(payload.viewState);
    sessionStorage.setItem("game_start", "true");
  }

  function handlePlayerJoined(payload: PlayerJoinedPayload) {
    // handle the join
    console.log(payload);

    game.addPlayer({
      name: payload.name,
      isReady: false,
      team: payload.team,
      isHost: false,
      isMe: false,
    });
  }

  // Subscribe to the Channel
  channel
    .on("broadcast", { event: "join" }, (payload) => messageReceived(payload))
    .on("broadcast", { event: "unlocked_key" }, (payload) =>
      keyUnlocked(payload.payload as unknown as UnlockedKeyPayload)
    )
    .on("broadcast", { event: "start_game" }, (payload) =>
      startingGame(payload.payload as unknown as StartingGamePayload)
    )
    .on("broadcast", { event: "player_joined" }, (payload) =>
      handlePlayerJoined(payload.payload as unknown as PlayerJoinedPayload)
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

  const startGame = (viewState: string) => {
    channel.send({
      type: "broadcast",
      event: "start_game",
      payload: { viewState },
    });
  };

  return { sendJoined, unlockedKey, startGame };
};
