"use client";

import { Button } from "../Button/Button";
import { PopupProps } from "../Map/Map";
import { Popup } from "../Popup/Popup";

export const StartInformation = ({ isVisible, setIsVisible }: PopupProps) => {
  if (!isVisible) return null;

  return (
    <Popup close={() => setIsVisible(false)}>
      <h1 className="text-center text-3xl py-3">Hitta Kristallen</h1>
      <div className="px-5">
        <p>
          Du står nu där historien började. En kvaddad blodbuss utan ett spår av
          blod. Det är uppenbart att vampyrer har flyttat in på Lindholmen. Ditt
          lag har som uppdrag att bege sig ut i natten och leta efter Den Mörka
          Dimmans Kristall. Kommer Vampyrerna först till kristallen så har de
          vunnit och kan erövra världen. Men kommer Vampyrjägarna först så
          vinner de och Lindholmen (och resten av världen) är räddad. För att få
          tag på kristallen behöver man samla ett antal nycklar. Använd kartan
          och lös gåtorna för att få nycklarna. Men kom ihåg att hålla ihop med
          ditt lag – och se upp! Man vet aldrig vem som lurar bakom hörnet…
        </p>
        <p>Någon måste våga sig ut i mörkret. Är du redo?</p>
      </div>
      <Button
        className="absolute bottom-3 right-2 border rounded-md drop-shadow-sm"
        onClick={() => setIsVisible(false)}
        text="Okej"
      />
    </Popup>
  );
};
