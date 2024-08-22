"use client";

import { Button } from "./components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameIntro } from "./components/GameIntro/GameIntro";
import { DifficultySetting } from "./components/DifficultySetting/DifficultySetting";
import { text } from "stream/consumers";

export type ViewState =
  | "landing"
  | "difficultySetting"
  | "inputHostName"
  | "joinSetup"
  | "setup"
  | "map"
  | "lobby"
  | "choose";

export default function Home() {
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState>("landing");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-8">
      {viewState === "landing" && (
        <>
          <GameIntro viewState={viewState} setViewState={setViewState} />
          <DifficultySetting
            viewState={viewState}
            setViewState={setViewState}
          />
          <Button text="fortsätt" onClick={() => setViewState("choose")} />
        </>
      )}

      {viewState === "choose" && (
        <div className="flex flex-col gap-9">
          <Button
            className="px-9"
            onClick={() => router.push("/create")}
            text="Skapa spel"
          />
          <Button
            className="px-9"
            onClick={() => router.push("/join")}
            text="Joina spel"
          />
        </div>
      )}
    </main>
  );
}
