"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useRoomId } from "@/app/hooks/useRoomId";
import { useGame } from "@/app/hooks/useGame";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { Popup } from "../Popup/Popup";

type ThirdQProps = {
  thirdQIsVisible: boolean;
  close: () => void;
};

export const ThirdQuest = ({ thirdQIsVisible, close }: ThirdQProps) => {
  const [thirdAnswer, setThirdAnswer] = useState("");
  const answer = "blache";
  const roomId = useRoomId();
  const client = useSupabaseClient(roomId);
  const game = useGame();

  const checkThirdAnswer = () => {
    if (thirdAnswer.toLowerCase() === answer) {
      client.completeQuest(game.playerTeam!, 3);
      close();
    }
  };
  if (!thirdQIsVisible) return null;
  return (
    <Popup close={close}>
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
          Lindholmens slott just här. Men vad hette egentligen drottningen som
          fick slottet i morgongåva? Ta dig upp på bron så ska det nog klarna… 
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
    </Popup>
  );
};
