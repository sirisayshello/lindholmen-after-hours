"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/Button/Button";
import { useGame } from "../hooks/useGame";
import Image from "next/image";

export default function Create() {
  const router = useRouter();
  let roomCode = Math.floor(Math.random() * 10000).toString();

  if (roomCode.length === 1) {
    roomCode = "000" + roomCode;
  } else if (roomCode.length === 2) {
    roomCode = "00" + roomCode;
  } else if (roomCode.length === 3) {
    roomCode = "0" + roomCode;
  }

  const game = useGame();

  function SetHostAndCreateGame() {
    game.setToHost();
    router.push(`/${roomCode}`);
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
        <h1>Välj svårighetsgrad</h1>

        <Image src="/enkel.svg" width={300} height={60} alt="" />
        <Image src="/mellan.svg" width={285} height={60} alt="" />
        <Image src="/tuff.svg" width={285} height={60} alt="" />

        <p>
          Svårighetsgrad LÄTT passar för fegisar. Du har 40 minuter på dig fram
          till undergång eller överlevnad.
        </p>

        <Button onClick={SetHostAndCreateGame} text="Fortsätt" />
      </div>
    </main>
  );
}
