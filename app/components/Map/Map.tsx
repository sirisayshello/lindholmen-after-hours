"use client";

import { ViewState } from "@/app/page";
import Image from "next/image";
import { Popup } from "../Popup/Popup";
import { useState } from "react";

type MapProps = {
  viewState: string;
  setViewState: (value: ViewState) => void;
};

export type PopupProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};
export type FirstQProps = {
  firstQIsVisible: boolean;
  setFirstQIsVisible: (value: boolean) => void;
};

export const Map = ({ viewState, setViewState }: MapProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [firstQIsVisible, setFirstQIsVisible] = useState(false);

  return (
    <>
      {viewState === "map" && (
        <>
          <Popup isVisible={isVisible} setIsVisible={setIsVisible} />
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
              onClick={() => setIsVisible(true)}
              className="absolute bottom-8 left-8"
              src="/info.svg"
              width={25}
              height={25}
              alt="information"
            />
          </div>
        </>
      )}
    </>
  );
};
