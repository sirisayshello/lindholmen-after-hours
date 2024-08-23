"use client";

import { Happening } from "@/app/components/Happening/Happening";
import { Map } from "@/app/components/Map/Map";
import { QuestCounter } from "@/app/components/QuestCounter/QuestCounter";
import { Timer } from "@/app/components/Timer/Timer";
import JSConfetti from "js-confetti";
import { useRouter } from "next/navigation";

import { useGame } from "@/app/hooks/useGame";
import Image from "next/image";
import { Button } from "@/app/components/Button/Button";

export default function Play() {
  const game = useGame();
  const router = useRouter();

  if (game.winner) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["💎"],
      emojiSize: 120,
      confettiNumber: 30,
    });
    return (
      <main className="flex min-h-svh flex-col items-center p-8 gap-12">
        <div className="flex flex-col justify-center items-center gap-4 pt-9">
          <Image src="/crystal.png" height={171} width={161} alt="kristall" />
          <h1 className="text-4xl font-extrabold">WOHO!</h1>
          <h2 className="text-2xl pt-3">Kristallen är uphittad</h2>
          <h2 className="text-2xl">{game.winner} vann!</h2>
          <h2 className="pt-8">Spelet är över</h2>
        </div>
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
