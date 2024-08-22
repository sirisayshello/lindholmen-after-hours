"use client";

import { ViewState } from "@/app/page";
import Image from "next/image";
import { Popup } from "../Popup/Popup";
import { useState } from "react";
import { FirstQuest } from "../FirstQuest/FirstQuest";
import { SecondQuest } from "../SecondQuest/SecondQuest";
import { set } from "lodash";
import { ThirdQuest } from "../ThirdQuest/ThirdQuest";

export type PopupProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};
export type Quest = undefined | "first" | "second" | "third" | "final";

export const Map = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [questVisible, setQuestVisible] = useState<Quest>();

  const close = () => {
    setQuestVisible(undefined);
  };

  return (
    <>
      <Popup isVisible={isVisible} setIsVisible={setIsVisible} />
      <FirstQuest firstQIsVisible={questVisible === "first"} close={close} />
      <SecondQuest secondQIsVisible={questVisible === "second"} close={close} />
      <ThirdQuest thirdQIsVisible={questVisible === "third"} close={close} />
      <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
        <div className="relative">
          <Image
            src="/map.png"
            width={300}
            height={300}
            alt="map of lindholmen"
          />
          <Image
            onClick={() => setQuestVisible("second")}
            className="absolute top-[135px] left-[80px]"
            src="/pin.svg"
            width={25}
            height={25}
            alt="pin of location 2"
          />
          <Image
            onClick={() => setQuestVisible("first")}
            className="absolute top-[215px] left-[175px]"
            src="/pin.svg"
            width={25}
            height={25}
            alt="pin of location 1"
          />
          <Image
            onClick={() => setQuestVisible("third")}
            className="absolute top-[305px] left-[-5px]"
            src="/pin.svg"
            width={25}
            height={25}
            alt="pin of location 3"
          />
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
