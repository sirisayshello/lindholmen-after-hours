"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useRoomId } from "@/app/hooks/useRoomId";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { useGame } from "@/app/hooks/useGame";
import { Popup } from "../Popup/Popup";

type SecondQProps = {
  secondQIsVisible: boolean;
  close: () => void;
};

export const SecondQuest = ({ secondQIsVisible, close }: SecondQProps) => {
  const [secondAnswer, setSecondAnswer] = useState("");
  const answer = "kackerlacka";
  const roomId = useRoomId();
  const client = useSupabaseClient(roomId);
  const game = useGame();

  const checkSecondAnswer = () => {
    if (secondAnswer.toLowerCase() === answer) {
      client.completeQuest(game.playerTeam!, 2);
      close();
    }
  };
  if (!secondQIsVisible) return null;
  return (
    <Popup close={close}>
      <h1 className="text-center text-3xl py-3">Uppdrag</h1>
      <div className="px-5">
        <Image
          src="/second_quest.jpeg"
          width={281}
          height={216}
          alt="husfasad"
        />
        <p>
          Sch! Hörde du? Nattens djur krälar i buskarna. Se upp! Vad är det för
          skugga som skymtar på den solfärgade fasaden?
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
      <Button onClick={checkSecondAnswer} text="Svara" />
    </Popup>
  );
};
