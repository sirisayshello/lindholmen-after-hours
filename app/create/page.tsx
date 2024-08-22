"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/Button/Button";
import { useGame } from "../hooks/useGame";

export default function Create() {
  const router = useRouter();
  let roomCode = Math.floor(Math.random() * 10000);
  const game = useGame();

  // const joinGame = () => {
  //   client.sendJoined(name, team);
  //   game.addPlayer({
  //     name: name,
  //     team: team,
  //     isReady: false,
  //     isHost: false,
  //     isMe: true,
  //   });
  //   setViewState("lobby");
  // };

  return (
    <div>
      <h1>create game</h1>

      <p>{roomCode}</p>

      <Button onClick={() => router.push(`/${roomCode}`)} text="Enter room" />
    </div>
  );
}
