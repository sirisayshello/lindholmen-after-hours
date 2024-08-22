"use client";

import { Teams, useGame } from "@/app/hooks/useGame";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { useState } from "react";
import { Button } from "../Button/Button";
import { ViewState } from "@/app/page";

type PlayerFormProps = {
  roomId: string;
  viewState: ViewState;
  setViewState: (value: ViewState) => void;
};

export const PlayerForm = ({
  roomId,
  viewState,
  setViewState,
}: PlayerFormProps) => {
  const client = useSupabaseClient(roomId);
  const game = useGame();
  const [name, setName] = useState("");
  const [team, setTeam] = useState<Teams>("humans");
  const [teamButton, setTeamButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: Teams) => {
    setTeamButton(buttonId);
    setTeam(buttonId);
  };

  const joinGame = () => {
    client.sendJoined(name, team);
    game.addPlayer({
      name: name,
      team: team,
      isReady: false,
      isHost: false,
      isMe: true,
    });
    setViewState("lobby");
  };

  return (
    <>
      {viewState === "setup" && (
        <div className="bg-slate-500 z-20">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
              maxLength={12}
            ></input>
          </div>
          <div>
            <label htmlFor="name">Choose team</label>
            {teamButton === "humans" && <p>Humans are lame</p>}
            {teamButton === "vampires" && <p>Vampires are cool</p>}
            <button onClick={() => handleButtonClick("humans")}>Humans</button>
            <button onClick={() => handleButtonClick("vampires")}>
              Vampires
            </button>

            <Button onClick={joinGame} text="JOIN GAME" />
          </div>
        </div>
      )}
    </>
  );
};
