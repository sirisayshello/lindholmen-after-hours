"use client";

import { ViewState } from "@/app/page";

type MapProps = {
  viewState: string;
  setViewState: (value: ViewState) => void;
};

export const Map = ({ viewState, setViewState }: MapProps) => {
  return (
    <>
      {viewState === "Map" && (
        <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
          <img src=".public/maptest.png" alt="map of lindholmen" />
        </div>
      )}
    </>
  );
};
