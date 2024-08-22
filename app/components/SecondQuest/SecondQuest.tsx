"use client";

import Image from "next/image";
import { useState } from "react";
import { SecondQProps } from "../Map/Map";
import { Button } from "../Button/Button";

export const SecondQuest = ({
  secondQIsVisible,
  setSecondQIsVisible,
}: SecondQProps) => {
  if (!secondQIsVisible) return null;
  const [secondAnswer, setSecondAnswer] = useState("");
  const answer = "kackerlacka";

  const checkSecondAnswer = () => {
    if (secondAnswer === answer) {
      // TODO: Sätt plus för laget
    }
  };
  return (
    <>
      <div className="absolute top-6 flex flex-col items-center">
        <div className="w-11/12 h-screen relative z-30 bg-slate-500">
          <div
            className="absolute top-2 right-2"
            onClick={() => setSecondQIsVisible(false)}
          >
            <Image src="/x.svg" width={26} height={26} alt="close" />
          </div>
          <h1 className="text-center text-3xl py-3">Uppdrag</h1>
          <div className="px-5">
            <Image
              src="/second_quest.jpeg"
              width={281}
              height={216}
              alt="husfasad"
            />
            <p>
              Sch! Hörde du? Nattens djur krälar i buskarna. Se upp! Vad är det
              för skugga som skymtar på den solfärgade fasaden?
            </p>
          </div>
          <input
            className="text-black"
            onChange={(e) => setSecondAnswer(e.target.value.toLowerCase())}
            value={secondAnswer}
            id="second_quest"
            type="text"
            placeholder="fritext"
            maxLength={12}
          ></input>
          <Button onClick={() => checkSecondAnswer()} text="Svara" />
          {/* <button
            className="absolute bottom-3 right-2 border rounded-md drop-shadow-sm"
            onClick={() => setSecondQIsVisible(false)}
          >
            Okej
          </button> */}
        </div>
      </div>
    </>
  );
};
