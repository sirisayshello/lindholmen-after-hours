"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useRoomId } from "@/app/hooks/useRoomId";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { Popup } from "../Popup/Popup";

type FinalQProps = {
  finalQIsVisible: boolean;
  close: () => void;
};

export const FinalQuest = ({ finalQIsVisible, close }: FinalQProps) => {
  const [finalAnswer, setFinalAnswer] = useState("");
  const answer = ["brun", "brunt"];
  const roomId = useRoomId();

  const client = useSupabaseClient(roomId);

  const checkFinalAnswer = () => {
    if (answer.includes(finalAnswer.toLowerCase())) {
      console.log("correct");

      client.endGame();
    }
  };
  if (!finalQIsVisible) return null;
  return (
    <Popup close={close}>
      <h1 className="w-full text-center text-3xl pt-3">Överlevnad</h1>
      <h1 className="w-full text-center text-3xl ">VS</h1>
      <h1 className="w-full text-center text-3xl pb-3">Undergång</h1>
      <div className="px-5">
        <Image
          src="/final_quest.jpeg"
          width={281}
          height={216}
          alt="basen av en liten vit byggnad"
        />
        <p>
          Den Mörka Dimmans Kristall är nära! Ett tips från en anonym källa
          vittnar om att kristallen ligger gömd i den lilla fyren. Skynda dig
          dit och rikta blicken uppåt. Vilken färg får du om du blandar dem du
          ser?
        </p>
      </div>
      <input
        className="text-black"
        onChange={(e) => setFinalAnswer(e.target.value.toLowerCase())}
        value={finalAnswer}
        id="final_quest"
        type="text"
        placeholder="fritext"
        maxLength={12}
      ></input>
      <Button onClick={() => checkFinalAnswer()} text="Svara" />
    </Popup>
  );
};
