"use client";

import Image from "next/image";
import { useState } from "react";

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <div className="absolute top-6 flex flex-col items-center">
        <div className="w-11/12 h-screen relative z-30 bg-slate-500">
          <div
            className="absolute top-2 right-2"
            onClick={() => setIsVisible(false)}
          >
            <Image src="/x.svg" width={26} height={26} alt="close" />
          </div>
          <h1 className="text-center text-3xl py-3">Hitta Kristallen</h1>
          <div className="px-5">
            <p>
              Du står nu där historien började. En kvaddad blodbuss utan ett
              spår av blod. Det är uppenbart att vampyrer har flyttat in på
              Lindholmen. Ditt lag har som uppdrag att bege sig ut i natten och
              leta efter Den Mörka Dimmans Kristall. Kommer Vampyrerna först
              till kristallen så har de vunnit och kan erövra världen. Men
              kommer Vampyrjägarna först så vinner de och Lindholmen (och resten
              av världen) är räddad. För att få tag på kristallen behöver man
              samla ett antal nycklar. Använd kartan och lös gåtorna för att få
              nycklarna. Men kom ihåg att hålla ihop med ditt lag – och se upp!
              Man vet aldrig vem som lurar bakom hörnet…
            </p>
            <p>Någon måste våga sig ut i mörkret. Är du redo?</p>
          </div>
          <button
            className="absolute bottom-3 right-2 border rounded-md drop-shadow-sm"
            onClick={() => setIsVisible(false)}
          >
            Okej
          </button>
        </div>
      </div>
    </>
  );
};
