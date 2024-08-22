"use client";

import { usePathname } from "next/navigation";
import { Button } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { Map } from "../components/Map/Map";
import { useGame } from "../hooks/useGame";
import { PlayerForm } from "../components/PlayerForm/PlayerForm";
import { ViewState } from "../page";

export default function Room() {
  const game = useGame();
  const players = game.players;
  const path = usePathname();
  const roomCode = path.slice(1);
  const client = useSupabaseClient(roomCode);
  const [viewState, setViewState] = useState<ViewState>("setup");

  useEffect(() => {}, [players]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      <h1>VÄLKOMMEN</h1>
      <p>{roomCode}</p>

      <PlayerForm
        viewState={viewState}
        setViewState={setViewState}
        roomId={roomCode}
      />

      <div>
        {players.map((player) => (
          <>
            <p>{player.name}</p>
            <p>{player.team}</p>
          </>
        ))}
      </div>

      <Map viewState={viewState} setViewState={setViewState} />

      <Button
        onClick={() => client.unlockedKey("siri & anton", 1)}
        text="SEND"
      />
    </main>
  );
}
