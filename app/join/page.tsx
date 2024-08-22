"use client";

import { useState } from "react";
import { Button } from "../components/Button/Button";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { useGame } from "../hooks/useGame";

export default function Join() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const client = useSupabaseClient(roomId);
  const game = useGame();

  const joinGame = () => {
    client.sendJoined("Siri");
    game.addPlayer({
      name: "Siri",
      team: "tbd",
      isReady: false,
      isHost: false,
      isMe: true,
    });
    router.push(`/${roomId}`);
  };

  return (
    <div>
      <label htmlFor="roomId">Room id</label>
      <input
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
        id="roomId"
        type="text"
        maxLength={4}
      ></input>
      <Button onClick={joinGame} text="JOIN GAME" />
    </div>
  );
}
