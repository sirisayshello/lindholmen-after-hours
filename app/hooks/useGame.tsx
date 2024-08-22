import { createContext, ReactNode, useContext, useState } from "react";

export type Teams = "vampire" | "humans" | "tbd";

export type Player = {
  name: string;
  team: Teams;
  isReady: boolean;
  isHost: boolean;
  isMe: boolean;
};

type GameContext = {
  players: Player[];
  addPlayer: (player: Player) => void;
};

const GameContext = createContext<GameContext>({
  players: [],
  addPlayer: function (player: Player): void {
    throw new Error("Function not implemented.");
  },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  return (
    <GameContext.Provider value={{ players, addPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
