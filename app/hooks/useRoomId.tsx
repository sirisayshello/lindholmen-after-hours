import { usePathname } from "next/navigation";

export const useRoomId = () => {
  const path = usePathname();
  const roomCode = path.slice(1, 5);

  return roomCode;
};
