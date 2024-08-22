"use client";

import { Map } from "@/app/components/Map/Map";
import { QuestCounter } from "@/app/components/QuestCounter/QuestCounter";
import { Timer } from "@/app/components/Timer/Timer";
import { useGame } from "@/app/hooks/useGame";

export default function Play() {
  const game = useGame();
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
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
