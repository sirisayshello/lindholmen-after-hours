"use client";

import { Button } from "./components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameIntro } from "./components/GameIntro/GameIntro";
import { DifficultySetting } from "./components/DifficultySetting/DifficultySetting";

export default function Home() {
  const router = useRouter();
  const [viewState, setViewState] = useState("landing");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      <GameIntro viewState={viewState} setViewState={setViewState} />
      <DifficultySetting viewState={viewState} setViewState={setViewState} />
      {/* <Button onClick={() => router.push("/create")} text="START NEW GAME" />
<Button onClick={() => router.push("/join")} text="JOIN GAME" /> */}
    </main>
  );
}
