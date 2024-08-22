"use client";

import { useState } from "react";
import { Button } from "../components/Button/Button";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { useGame } from "../hooks/useGame";

export default function Join() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
        <label htmlFor="roomId">Skriv in spelkod</label>
        <input
          className="text-black"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          id="roomId"
          type="text"
          maxLength={4}
        ></input>
        <Button onClick={() => router.push(`/${roomId}`)} text="Fortsätt" />
      </div>
    </main>
  );
}
