import Image from "next/image";
import { ReactNode } from "react";

export const Popup = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  return (
    <div className="absolute top-36 flex flex-col items-center">
      <div className="w-11/12 relative z-30 bg-gray-100 py-20 rounded-md text-black">
        <div className="absolute top-2 right-2" onClick={close}>
          <Image src="/x.svg" width={26} height={26} alt="close" />
        </div>
        {children}
      </div>
    </div>
  );
};
