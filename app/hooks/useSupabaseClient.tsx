import { supabase } from "@/supabase/client";
import { Teams, useGame } from "./useGame";

type Events = "key_unlocked" | "join";

type UnlockedKeyPayload = {
  team: string;
  keyId: number;
};

type PlayerJoinedPayload = {
  name: string;
};

type PlayerReadyPayload = {
  name: string;
  team: Teams;
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

  function handlePlayerJoined(payload: PlayerJoinedPayload) {
    // handle the join
    console.log(payload);

    game.addPlayer({
      name: payload.name,
      isReady: false,
      team: "tbd",
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
    .on("broadcast", { event: "player_joined" }, (payload) =>
      handlePlayerJoined(payload.payload as unknown as PlayerJoinedPayload)
    )
    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  // Join a room/topic. Can be anything except for 'realtime'.

  const sendJoined = (name: string) => {
    channel.send({
      type: "broadcast",
      event: "player_joined",
      payload: { name },
    });
  };

  const unlockedKey = (team: string, keyId: number) => {
    channel.send({
      type: "broadcast",
      event: "unlocked_key",
      payload: { team, keyId },
    });
  };

  return { sendJoined, unlockedKey };
};
