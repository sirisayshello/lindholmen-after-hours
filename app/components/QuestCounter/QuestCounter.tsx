"use client";

import Image from "next/image";

type CounterProps = {
  vampireCount: number;
  humanCount: number;
};

export const QuestCounter = ({ vampireCount, humanCount }: CounterProps) => {
  return (
    <div className="w-full h-16 max-w-xl flex items-center justify-between font-mono text-sm">
      <div className="flex gap-1 items-center">
        <Image
          className="rounded-md"
          src="/human.png"
          width={30}
          height={60}
          alt="human"
        />
        {humanCount}
        <p>/3</p>
      </div>
      <div className="flex gap-1 items-center">
        <Image
          className="rounded-md"
          src="/vampire.png"
          width={30}
          height={60}
          alt="vampire"
        />
        {vampireCount}
        <p>/3</p>
      </div>
    </div>
  );
};
