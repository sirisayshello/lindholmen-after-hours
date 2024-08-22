"use client";

import { usePathname } from "next/navigation";
import { Button } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { Map } from "../components/Map/Map";
import { useGame } from "../hooks/useGame";
import { PlayerForm } from "../components/PlayerForm/PlayerForm";
import { ViewState } from "../page";
import { QuestCounter } from "../components/QuestCounter/QuestCounter";

export default function Room() {
  const game = useGame();
  const players = game.players;
  const path = usePathname();
  const roomCode = path.slice(1);
  const client = useSupabaseClient(roomCode);
  const [viewState, setViewState] = useState<ViewState>("setup");
  const isHost = sessionStorage.getItem("host");
  const gameStart = sessionStorage.getItem("game_start");
  const [humanCount, setHumanCount] = useState(0);
  const [vampireCount, setVampireCount] = useState(0);

  if (isHost) {
    console.log("i am host");
  }

  useEffect(() => {
    if (gameStart) {
      setViewState("map");
    }
  }, [gameStart]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">

      <QuestCounter humanCount={humanCount} vampireCount={vampireCount} />
      <h1>VÄLKOMMEN</h1>
      <p>{roomCode}</p>

      {viewState != "map" && (
        <>
          <h1>Spelkod:</h1>
          <p>{roomCode}</p>
        </>
      )}


      <PlayerForm
        viewState={viewState}
        setViewState={setViewState}
        roomId={roomCode}
      />
      {viewState != "map" && (
        <>
          <div>
            {players.map((player) => (
              <>
                <p>
                  {player.name} har gått med {player.team}
                </p>
              </>
            ))}
          </div>
        </>
      )}

      <Map viewState={viewState} setViewState={setViewState} />

      {viewState != "map" && (
        <>
          <h1>När samtliga spelare är redo, tryck för att starta spelet</h1>
          <Button
            //onClick={() => client.unlockedKey("siri & anton", 1)}
            // onClick={() => client.startGame("map")}
            onClick={() => setViewState("map")}
            text="Starta Spel"
          />
        </>
      )}
    </main>
  );
}
