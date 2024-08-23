"use client";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md bg-gray-100 w-28 text-black ${
        className ?? ""
      }`}
    >
      {text}
    </button>
  );
};
