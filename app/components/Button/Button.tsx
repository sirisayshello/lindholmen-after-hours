"use client";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="p-2 rounded bg-black text-white">
      {text}
    </button>
  );
};
