"use client";

import { useGame } from "@/app/hooks/useGame";
import Image from "next/image";
import { useState } from "react";
import { FinalQuest } from "../FinalQuest/FinalQuest";
import { FirstQuest } from "../FirstQuest/FirstQuest";
import { SecondQuest } from "../SecondQuest/SecondQuest";
import { StartInformation } from "../StartInformation/StartInformation";
import { ThirdQuest } from "../ThirdQuest/ThirdQuest";
import { Popup } from "../Popup/Popup";

export type PopupProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};
export type Quest = undefined | "first" | "second" | "third" | "final";
export type Response = undefined | "good" | "bad" | "crystal";

export const Map = () => {
  const game = useGame();
  const [isVisible, setIsVisible] = useState(true);
  const [questVisible, setQuestVisible] = useState<Quest>();
  const [responseVisible, setResponseVisible] = useState<Response>();

  const completedFirstQuest = game.hasCompletedQuest(1);
  const completedSecondQuest = game.hasCompletedQuest(2);
  const completedThirdQuest = game.hasCompletedQuest(3);
  const showFinalQuest =
    completedFirstQuest && completedSecondQuest && completedThirdQuest;

  const close = () => {
    setQuestVisible(undefined);
  };
  const closeResponse = () => {
    setResponseVisible(undefined);
  };

  return (
    <>
      <StartInformation isVisible={isVisible} setIsVisible={setIsVisible} />
      <FirstQuest
        firstQIsVisible={questVisible === "first"}
        close={close}
        setResponseVisible={setResponseVisible}
      />
      <SecondQuest
        secondQIsVisible={questVisible === "second"}
        close={close}
        setResponseVisible={setResponseVisible}
      />
      <ThirdQuest
        thirdQIsVisible={questVisible === "third"}
        close={close}
        setResponseVisible={setResponseVisible}
      />
      <FinalQuest
        finalQIsVisible={questVisible === "final"}
        close={close}
        setResponseVisible={setResponseVisible}
      />
      {responseVisible === "good" && (
        <Popup close={closeResponse}>
          <h1>Bra Jobbat!</h1>
          <p className="text-center">Du har hittat en nyckel</p>
          <Image src="/bra.png" height={247} width={196} alt="tummen upp" />
        </Popup>
      )}
      {responseVisible === "bad" && (
        <Popup close={closeResponse}>
          <h1>Åh nej, försök igen!</h1>
          <Image src="/bad.png" height={247} width={196} alt="tummen ner" />
        </Popup>
      )}
      <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
        <div className="relative">
          {/* {responseVisible === "crystal" && (
            <Popup close={closeResponse}>
              <h1>Bra Jobbat!</h1>
              <p className="text-center">Du har hittat alla nycklar</p>
              <Image src="/bra.png" height={247} width={196} alt="tummen upp" />
              <p className="text-center">
                Du kan nu se kristallen på kartan, ta dig dit så fort du kan!
              </p>
            </Popup>
          )} */}
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
            <>
              {/* <Popup >
                <h1>Bra Jobbat!</h1>
                <p className="text-center">Du har hittat alla nycklar</p>
                <Image
                  src="/bra.png"
                  height={247}
                  width={196}
                  alt="tummen upp"
                />
                <p className="text-center">
                  Du kan nu se kristallen på kartan, ta dig dit så fort du kan!
                </p>
              </Popup> */}
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
            </>
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
