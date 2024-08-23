import Image from "next/image";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";

type HappeningProps = {
  close: () => void;
};
export const Happening = ({ close }: HappeningProps) => {
  return (
    <Popup close={close}>
      <h1 className="w-full text-center text-3xl pt-3">Blodmåne!</h1>

      <div className="px-5">
        <Image src="/bloodmoon.jpeg" width={117} height={147} alt="jage" />
        <p>
          Nu kan vampyrerna gå på jakt och tillfångata EN spelare från
          motståndarlaget. 
        </p>

        <p>
          OBS inga tänder! Använd händerna när du fångar ditt byte – och var
          försiktig. Tänk på att du är stark.
        </p>

        <p>
          I klartext: Det betyder att vampyrerna nu kan fånga en motspelare
          genom att nudda den. Den motspelare som fångas in först åker ut och
          måste gå bredvid.
        </p>
        <p>
          Pssst… Glöm inte huvuduppdraget: Att hitta kristallen innan de andra.
        </p>
      </div>

      <Button onClick={close} text="Tillbaka" />
    </Popup>
  );
};
