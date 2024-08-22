import { createContext, ReactNode, useContext, useState } from "react";
import uniqBy from "lodash/uniqBy";

export type Teams = "Vampyrerna" | "Vampyrjägarna";

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
  isHost: boolean;
  setToHost: () => void;
  updatePlayers: (players: Player[]) => void;
};

const GameContext = createContext<GameContext>({
  players: [],
  addPlayer: function (player: Player): void {
    throw new Error("Function not implemented.");
  },
  isHost: false,
  setToHost: function (): void {
    throw new Error("Function not implemented.");
  },
  updatePlayers: function (players: Player[]): void {
    throw new Error("Function not implemented.");
  },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(
    sessionStorage.getItem("host") === "true"
  );

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const setToHost = () => {
    setIsHost(isHost);
    sessionStorage.setItem("host", "true");
  };

  const updatePlayers = (newPlayers: Player[]) => {
    const allPlayers = [...players, ...newPlayers];
    const uniquePlayers: Player[] = uniqBy(allPlayers, "name");

    setPlayers([...uniquePlayers]);
  };

  return (
    <GameContext.Provider
      value={{ players, addPlayer, isHost, setToHost, updatePlayers }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
