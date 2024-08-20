"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/Button/Button";

export default function Create() {
  const router = useRouter();
  let roomCode = Math.floor(Math.random() * 10000);

  return (
    <div>
      <h1>create game</h1>

      <p>{roomCode}</p>

      <Button onClick={() => router.push(`/${roomCode}`)} text="Enter room" />
    </div>
  );
}
