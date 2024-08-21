"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "../hooks/useSupabaseClient";

export default function Room() {
  const path = usePathname();
  const roomCode = path.slice(1);
  // const searchParams = useSearchParams();
  // const [roomCode, setRoomCode] = useState("");
  const client = useSupabaseClient(roomCode);
  console.log(client);

  // useEffect(() => {
  //   if (searchParams.has("room-id")) {
  //     setRoomCode(searchParams.get("room-id") ?? "");
  //   }
  // }, [searchParams]);

  return (
    <div>
      <h1>VÄLKOMMEN</h1>

      <p>{roomCode}</p>
      <Button onClick={() => client.unlockedKey("vampyr", 1)} text="SEND" />
    </div>
  );
}
