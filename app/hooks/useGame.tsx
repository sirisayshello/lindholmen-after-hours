import { createContext, ReactNode, useContext, useState } from "react";
import { ViewState } from "../page";

export type Teams = "vampires" | "humans";

export type Player = {
  name: string;
  team: Teams;
  isReady: boolean;
  isHost: boolean;
  isMe: boolean;
};

export type GameviewState = {
  viewState: ViewState;
};

type GameContext = {
  gameViewState: ViewState;
  players: Player[];
  addPlayer: (player: Player) => void;
  addGameViewState: (gameViewState: ViewState) => void;
};

const GameContext = createContext<GameContext>({
  gameViewState: "map",
  addGameViewState: (gameViewState: ViewState) => void {},
  players: [],
  addPlayer: function (player: Player): void {
    throw new Error("Function not implemented.");
  },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameViewState, setGameViewState] = useState<ViewState>("map");
  const [players, setPlayers] = useState<Player[]>([]);

  const addGameViewState = (gameViewState: ViewState) => {
    setGameViewState(gameViewState);
  };

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  return (
    <GameContext.Provider
      value={{ players, addPlayer, gameViewState, addGameViewState }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
