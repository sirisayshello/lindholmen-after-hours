"use client";

import { useGame } from "@/app/hooks/useGame";
import Image from "next/image";
import { useState } from "react";
import { FinalQuest } from "../FinalQuest/FinalQuest";
import { FirstQuest } from "../FirstQuest/FirstQuest";
import { SecondQuest } from "../SecondQuest/SecondQuest";
import { StartInformation } from "../StartInformation/StartInformation";
import { ThirdQuest } from "../ThirdQuest/ThirdQuest";

export type PopupProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};
export type Quest = undefined | "first" | "second" | "third" | "final";

export const Map = () => {
  const game = useGame();
  const [isVisible, setIsVisible] = useState(true);
  const [questVisible, setQuestVisible] = useState<Quest>();

  const completedFirstQuest = game.hasCompletedQuest(1);
  const completedSecondQuest = game.hasCompletedQuest(2);
  const completedThirdQuest = game.hasCompletedQuest(3);
  const showFinalQuest =
    completedFirstQuest && completedSecondQuest && completedThirdQuest;

  const close = () => {
    setQuestVisible(undefined);
  };

  return (
    <>
      <StartInformation isVisible={isVisible} setIsVisible={setIsVisible} />
      <FirstQuest firstQIsVisible={questVisible === "first"} close={close} />
      <SecondQuest secondQIsVisible={questVisible === "second"} close={close} />
      <ThirdQuest thirdQIsVisible={questVisible === "third"} close={close} />
      <FinalQuest finalQIsVisible={questVisible === "final"} close={close} />
      <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
        <div className="relative">
          <Image
            src="/map.png"
            width={300}
            height={300}
            alt="map of lindholmen"
          />
          {!completedFirstQuest && (
            <Image
              onClick={() => {
                setQuestVisible("first");
              }}
              className="absolute top-[215px] left-[175px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 1"
            />
          )}
          {!completedSecondQuest && (
            <Image
              onClick={() => {
                setQuestVisible("second");
              }}
              className="absolute top-[135px] left-[80px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 2"
            />
          )}
          {!completedThirdQuest && (
            <Image
              onClick={() => {
                if (completedThirdQuest) {
                  return;
                }
                setQuestVisible("third");
              }}
              className="absolute top-[305px] left-[-5px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 3"
            />
          )}
          {showFinalQuest && (
            <Image
              onClick={() => {
                setQuestVisible("final");
              }}
              className="absolute top-[120px] right-[10px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of final location"
            />
          )}
        </div>
        <Image
          onClick={() => setIsVisible(true)}
          className="absolute bottom-8 left-8"
          src="/info.svg"
          width={25}
          height={25}
          alt="information"
        />
      </div>
    </>
  );
};
