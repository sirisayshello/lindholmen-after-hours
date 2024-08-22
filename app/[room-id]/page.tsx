"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lobby } from "../components/Lobby/Lobby";
import { Map } from "../components/Map/Map";
import { PlayerForm } from "../components/PlayerForm/PlayerForm";
import { useGame } from "../hooks/useGame";
import { ViewState } from "../page";

export default function Room() {
  const game = useGame();
  const path = usePathname();
  const roomCode = path.slice(1);

  const [viewState, setViewState] = useState<ViewState>("setup");

  if (game.isHost) {
    console.log("i am host");
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      <PlayerForm
        viewState={viewState}
        setViewState={setViewState}
        roomId={roomCode}
      />
      <Map viewState={viewState} setViewState={setViewState} />
      <Lobby
        viewState={viewState}
        setViewState={setViewState}
        roomCode={roomCode}
      />
    </main>
  );
}
