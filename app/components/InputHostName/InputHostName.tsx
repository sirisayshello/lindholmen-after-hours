"use client";

import { Button } from "../Button/Button";

type InputHostNameProps = {
  viewState: string;
  setViewState: (value: string) => void;
};

export const inputHostName = ({
  viewState,
  setViewState,
}: InputHostNameProps) => {
  return (
    <>
      {viewState === "inputHostName" && (
        <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
          {/* TODO: Form mata in namn */}
          <Button
            onClick={() => setViewState("HostLobby")}
            text="START NEW GAME"
          />
        </div>
      )}
    </>
  );
};
