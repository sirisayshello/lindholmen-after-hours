import { supabase } from "@/supabase/client";
import { log } from "console";

type Events = "key_unlocked" | "join";

type UnlockedKeyPayload = {
  team: string;
  keyId: number;
};

export const useSupabaseClient = (roomId: string) => {
  // Join a room/topic. Can be anything except for 'realtime'.
  const channel = supabase.channel(roomId);

  // Simple function to log any messages we receive
  function messageReceived(payload: unknown) {
    console.log(payload);
  }

  function keyUnlocked(payload: UnlockedKeyPayload) {
    console.log(`The ${payload.team} has unlocked key ${payload.keyId}`);
  }

  // Subscribe to the Channel
  channel
    .on("broadcast", { event: "join" }, (payload) => messageReceived(payload))
    .on("broadcast", { event: "unlocked_key" }, (payload) =>
      keyUnlocked(payload.payload as unknown as UnlockedKeyPayload)
    )
    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  // Join a room/topic. Can be anything except for 'realtime'.

  const sendJoined = () => {
    channel.send({
      type: "broadcast",
      event: "join",
      payload: { message: "hello, world" },
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
