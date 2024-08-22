"use client";

import { ViewState } from "@/app/page";
import Image from "next/image";

type MapProps = {
  viewState: string;
  setViewState: (value: ViewState) => void;
};

export const Map = ({ viewState, setViewState }: MapProps) => {
  return (
    <>
      {viewState === "map" && (
        <div className="w-full max-w-xl flex flex-col gap-8 items-center font-mono text-sm">
          <div className="relative">
            <Image
              src="/map.png"
              width={500}
              height={500}
              alt="map of lindholmen"
            />
            <Image
              // onClick={}
              className="absolute top-[150px] left-[85px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 1"
            />
            <Image
              // onClick={}
              className="absolute top-[235px] left-[192px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 2"
            />
            <Image
              // onClick={}
              className="absolute top-[330px] left-[-5px]"
              src="/pin.svg"
              width={25}
              height={25}
              alt="pin of location 3"
            />
          </div>
          <Image
            // onClick={}
            className="absolute bottom-8 left-8"
            src="/info.svg"
            width={25}
            height={25}
            alt="information"
          />
        </div>
      )}
    </>
  );
};
