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
        <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
          <p className="flex w-full justify-center">Lindholmen by night</p>

          <p className="">
            Det började med ett märkligt rån. En blodbuss försvann spårlöst från
            Lärdomsgatan på Lindholmen och hittades senare på natten kvaddad i
            Kiellers park - helt tömd på blod. Händelsen skakade göteborgarna
            och konspirationsteorier om att vampyrer skulle befinna sig i
            stadsdelen började spridas. Kalla fall om ouppklarade försvinnanden
            blev varma igen och polischefen utlyste utegångsförbud i stadsdelen
            från klockan 22:00. Inte en så big deal egentligen, eftersom
            Lindholmen töms på folk redan vid 17:30. Men ändå. Det är tanken som
            räknas. Hur som helst. Människor reagerar på antingen ett eller ett
            annat sätt när det kommer till förbud. Det finns de som lyssnar och
            stannar hemma. Men desto fler gör precis tvärtom. Lindholmen blev
            plötsligt en hot spot för kicksökare och sanningssägare och
            underliga fynd har registrerats på olika platser runt om i
            stadsdelen. Bland pålästa är vampyrerna numera en vedertagen
            sanning. De har kommit till Lindholmen och de verkar hungriga.
          </p>
          <div className="flex w-full justify-evenly">
            <Button
              onClick={() => setViewState("difficultySetting")}
              text="START NEW GAME"
            />
            <Button
              onClick={() => setViewState("joinSetup")}
              text="JOIN GAME"
            />
          </div>
        </div>
      )}
    </>
  );
};
