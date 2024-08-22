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
      className={`p-2 rounded bg-black text-white ${className ?? ""}`}
    >
      {text}
    </button>
  );
};
