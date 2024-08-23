"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lobby } from "../components/Lobby/Lobby";
import { Map } from "../components/Map/Map";
import { PlayerForm } from "../components/PlayerForm/PlayerForm";
import { useGame } from "../hooks/useGame";
import { ViewState } from "../page";
import { useRoomId } from "../hooks/useRoomId";

export default function Room() {
  const roomCode = useRoomId();

  const [viewState, setViewState] = useState<ViewState>("setup");

  return (
    <main className="flex min-h-svh flex-col items-center px-8 pt-12">
      <PlayerForm
        viewState={viewState}
        setViewState={setViewState}
        roomId={roomCode}
      />

      <Lobby
        viewState={viewState}
        setViewState={setViewState}
        roomCode={roomCode}
      />
    </main>
  );
}
