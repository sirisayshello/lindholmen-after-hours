"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "../Button/Button";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { useGame } from "@/app/hooks/useGame";
import { useRoomId } from "@/app/hooks/useRoomId";
import { log } from "console";

type FirstQProps = {
  firstQIsVisible: boolean;
  close: () => void;
};

export const FirstQuest = ({ firstQIsVisible, close }: FirstQProps) => {
  const [firstAnswer, setFirstAnswer] = useState("");
  const answer = "19800902";
  const roomId = useRoomId();
  const game = useGame();
  const client = useSupabaseClient(roomId);

  const checkFirstAnswer = () => {
    if (firstAnswer === answer) {
      client.completeQuest(game.playerTeam!, 1);
      close();
    }
  };
  if (!firstQIsVisible) {
    return null;
  }
  return (
    <>
      <div className="absolute top-6 flex flex-col items-center">
        <div className="w-11/12 h-screen relative z-30 bg-slate-500">
          <div className="absolute top-2 right-2" onClick={close}>
            <Image src="/x.svg" width={26} height={26} alt="close" />
          </div>
          <h1 className="text-center text-3xl py-3">Uppdrag</h1>
          <div className="px-5">
            <Image
              src="/first_quest.jpeg"
              width={281}
              height={216}
              alt="svävande klot"
            />
            <p>
              Vampyrer är solskygga varelser men på denna plats finns ett
              svävande klot som även skuggor kan gå nära. En hemlig
              sifferkombination gömmer sig i mellanrummen. Hur nära vågar du gå?
            </p>
          </div>

          <input
            className="text-black"
            onChange={(e) => setFirstAnswer(e.target.value)}
            value={firstAnswer}
            id="first_quest"
            type="text"
            placeholder="fritext"
            maxLength={12}
          ></input>
          <Button onClick={() => checkFirstAnswer()} text="Svara" />
        </div>
      </div>
    </>
  );
};
