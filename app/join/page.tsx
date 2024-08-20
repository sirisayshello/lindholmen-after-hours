"use client";

import { useState } from "react";
import { Button } from "../components/Button/Button";
import { useRouter } from "next/navigation";

export default function Join() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

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
      <Button onClick={() => router.push(`/${roomId}`)} text="JOIN GAME" />
    </div>
  );
}
