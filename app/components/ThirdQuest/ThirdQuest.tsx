"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button/Button";

type ThirdQProps = {
  thirdQIsVisible: boolean;
  close: () => void;
};

export const ThirdQuest = ({ thirdQIsVisible, close }: ThirdQProps) => {
  const [thirdAnswer, setThirdAnswer] = useState("");
  const answer = "blache";

  const checkThirdAnswer = () => {
    if (thirdAnswer === answer) {
      // TODO: Sätt plus för laget
    }
  };
  if (!thirdQIsVisible) return null;
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
              src="/third_quest.jpeg"
              width={281}
              height={216}
              alt="skylt vid bro"
            />
            <p>
              Vampyrer håller gärna till i gamla slott och en gång i tiden låg
              Lindholmens slott just här. Men vad hette egentligen drottningen
              som fick slottet i morgongåva? Ta dig upp på bron så ska det nog
              klarna… 
            </p>
          </div>
          <input
            className="text-black"
            onChange={(e) => setThirdAnswer(e.target.value.toLowerCase())}
            value={thirdAnswer}
            id="third_quest"
            type="text"
            placeholder="fritext"
            maxLength={12}
          ></input>
          <Button onClick={() => checkThirdAnswer()} text="Svara" />
          {/* <button
            className="absolute bottom-3 right-2 border rounded-md drop-shadow-sm"
            onClick={() => setThirdQIsVisible(false)}
          >
            Okej
          </button> */}
        </div>
      </div>
    </>
  );
};
