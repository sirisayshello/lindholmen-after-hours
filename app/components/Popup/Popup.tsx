import Image from "next/image";
import { ReactNode } from "react";

type PopupProps = {
  goodIsVisible?: boolean;
  badIsVisible?: boolean;
  crystalIsVisible?: boolean;
  children: ReactNode;
  close: () => void;
};

export const Popup = ({
  goodIsVisible,
  badIsVisible,
  crystalIsVisible,
  children,
  close,
}: PopupProps) => {
  return (
    <div className="absolute top-36 flex flex-col items-center">
      <div className="w-[300px] relative z-30 bg-gray-100 py-20 rounded-md text-black p-4 flex flex-col items-center justify-center gap-2">
        <div className="absolute top-2 right-2" onClick={close}>
          <Image src="/x.svg" width={26} height={26} alt="close" />
        </div>
        {children}
      </div>
    </div>
  );
};
