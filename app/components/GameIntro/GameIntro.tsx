"use client";

import { ViewState } from "@/app/page";
import { Button } from "../Button/Button";

type GameIntroProps = {
  viewState: ViewState;
  setViewState: (value: ViewState) => void;
};

export const GameIntro = ({ viewState, setViewState }: GameIntroProps) => {
  return (
    <>
      {viewState === "landing" && (
        <div className="w-full max-w-xl flex flex-col gap-4 items-center font-mono text-sm pt-8">
          <p className="flex w-full justify-center text-xl font-bold">
            Det började med...
          </p>
          <p className="">
            ... ett märkligt rån. En blodbuss försvann spårlöst och hittades
            senare på natten kvaddad vid Lärdomsgatan på Lindholmen, helt tömd
            på blod.{" "}
          </p>{" "}
          <p>
            {" "}
            Händelsen skakade göteborgarna och konspirationsteorier om att
            vampyrer skulle befinna sig i stadsdelen började spridas.
          </p>{" "}
          <p>
            {" "}
            Snart därpå utlyste polischefen utegångsförbud i stadsdelen från
            klockan 22:00. Inte en så big deal egentligen, eftersom Lindholmen
            töms på folk redan vid 17:30. Men ändå.{" "}
          </p>{" "}
          <p>
            {" "}
            Hur som helst. Människor reagerar på antingen ett eller ett annat
            sätt när det kommer till förbud. Det finns de som lyssnar och
            stannar inne. Men desto fler gör precis tvärtom.{" "}
          </p>{" "}
          <p>
            {" "}
            Lindholmen blev plötsligt en hot spot för både jägare och blodsugare
            och underliga fynd har registrerats på olika platser runt om i
            stadsdelen.{" "}
          </p>
          <p>
            {" "}
            Bland pålästa är det redan en vedertagen sanning. Vampyrer har
            kommit till Lindholmen – och de verkar hungriga.
          </p>
          <div className="flex w-full justify-evenly"></div>
        </div>
      )}
    </>
  );
};
