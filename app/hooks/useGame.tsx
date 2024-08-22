import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  endTime: number | undefined;
  setEndTime: (value: number) => void;
  humanScore: number;
  vampireScore: number;
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
  endTime: undefined,
  setEndTime: function (value: number): void {
    throw new Error("Function not implemented.");
  },
  humanScore: 0,
  vampireScore: 0,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [endTime, setEndTime] = useState<number>();
  const [humanScore, setHumanScore] = useState(0);
  const [vampireScore, setVampireScore] = useState(0);

  useEffect(() => {
    if (window !== undefined) {
      setIsHost(sessionStorage.getItem("host") === "true");
    }
  }, []);

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
      value={{
        players,
        addPlayer,
        isHost,
        setToHost,
        updatePlayers,
        endTime,
        setEndTime,
        humanScore,
        vampireScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
