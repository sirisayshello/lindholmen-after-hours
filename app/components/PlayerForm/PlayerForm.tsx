"use client";

import { Teams, useGame } from "@/app/hooks/useGame";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { useState } from "react";
import { Button } from "../Button/Button";
import { ViewState } from "@/app/page";
import Image from "next/image";

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
  const [team, setTeam] = useState<Teams>("Vampyrjägarna");
  const [teamButton, setTeamButton] = useState<string | null>("Vampyrjägarna");

  const handleButtonClick = (buttonId: Teams) => {
    setTeamButton(buttonId);
    setTeam(buttonId);
  };

  const joinGame = () => {
    if (!name) {
      return;
    }
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
        <div className="z-20">
          <div className="flex flex-col gap-4">
            <label className="text-center" htmlFor="name">
              Skriv in ditt namn
            </label>
            <input
              className="text-black w-full rounded-md"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              id="name"
              type="text"
              maxLength={12}
            ></input>
          </div>
          <div>
            <div className="flex flex-col justify-center">
              <h1 className="text-center text-3xl py-3">Välj lag</h1>
              {teamButton === "Vampyrjägarna" && (
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    className="rounded-md"
                    src="/human.png"
                    width={140}
                    height={184}
                    alt="Vampyrjägare"
                  />
                  <div className="flex flex-col gap-4">
                    <p>
                      Vigvatten är en myt. Det funkar lika bra med kranvatten,
                      så länge man saltar ordentligt (gärna jodfritt). Det är
                      sånt man vet när man är jägare.
                    </p>{" "}
                    <p>
                      {" "}
                      Något som Joni också vet är att Mörka Dimmans Kristall
                      nyligen stals och nu verkar förvaras någonstans på
                      Lindholmen. Det där sabla vampyrgänget verkar visst
                      planera för jordens undergång.
                    </p>
                    <p>
                      {" "}
                      Vad de däremot inte har planerat för är Joni och hennes
                      episka jägarkollektiv. De är mer än redo att inta natten –
                      och rädda världen.{" "}
                    </p>
                    <p> Styrka: Smart. Avancerad teknisk utrustning. </p>{" "}
                    <p>Svaghet: Låg metabolism.</p>
                  </div>
                </div>
              )}
              {teamButton === "Vampyrerna" && (
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    src="/vampire.png"
                    width={160}
                    height={204}
                    alt="Vampyr"
                  />
                  <div className="flex flex-col gap-4">
                    <p>
                      Det var egentligen en vattentät plan. Sno Mörka Dimmans
                      Kristall och sedan: världsherravälde. Men en förrädare
                      måste ha infiltrerat Nardus gäng, för plötsligt var
                      Vampyrstyrelsen dem hack i häl.
                    </p>
                    <p>
                      {" "}
                      Gänget flydde och slog till slut läger på Lindholmen. Nu
                      behövde de en ordentlig fest. Så när Nardus hittade den
                      där blodbussen la de plattan i mattan.
                    </p>
                    <p>
                      {" "}
                      Storslaget! Ja, förutom den lilla detaljen att Nardus inte
                      längre kan komma ihåg vart han gömde den där kristallen.
                    </p>
                    <p>
                      {" "}
                      Nu är det bråttom. Vampyrerna måste hitta kristallen så
                      fort solen går ner – för nu kryllar Lindholmen av jägare.
                    </p>
                    <p>Styrka: Stark. Vassa tänder.</p>
                    <p> Svaghet: Dålig impulskontroll.</p>
                  </div>
                </div>
              )}
              <div className="flex flex-row w-full justify-between pt-4">
                <Button
                  onClick={() => handleButtonClick("Vampyrjägarna")}
                  text="Vampyrjägare"
                />
                <Button
                  onClick={() => handleButtonClick("Vampyrerna")}
                  text="Vampyr"
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-end py-4">
              <Button onClick={joinGame} text="Fortsätt" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
