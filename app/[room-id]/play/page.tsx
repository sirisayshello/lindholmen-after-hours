"use client";

import { Happening } from "@/app/components/Happening/Happening";
import { Map } from "@/app/components/Map/Map";
import { QuestCounter } from "@/app/components/QuestCounter/QuestCounter";
import { Timer } from "@/app/components/Timer/Timer";

import { useGame } from "@/app/hooks/useGame";

export default function Play() {
  const game = useGame();

  if (game.winner) {
    return (
      <main className="flex min-h-svh flex-col items-center p-8 gap-12">
        {game.winner} vann!
      </main>
    );
  }
  return (
    <main className="flex min-h-svh flex-col items-center p-8 gap-12">
      {game.happening && (
        <Happening close={() => game.setHappening(undefined)} />
      )}
      <QuestCounter
        humanCount={game.humanScore}
        vampireCount={game.vampireScore}
      >
        <Timer endTime={game.endTime} />
      </QuestCounter>
      <Map />
    </main>
  );
}
