"use client";

import { ViewState } from "@/app/page";
import { Button } from "../Button/Button";

type DifficultySettingProps = {
  viewState: ViewState;
  setViewState: (value: ViewState) => void;
};

export const DifficultySetting = ({
  viewState,
  setViewState,
}: DifficultySettingProps) => {
  return (
    <>
      {viewState === "difficultySetting" && (
        <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
          <button>lätt</button>
          <button>mellan</button>
          <button>hjälp</button>
          <Button
            onClick={() => setViewState("inputHostName")}
            text="START NEW GAME"
          />
        </div>
      )}
    </>
  );
};
