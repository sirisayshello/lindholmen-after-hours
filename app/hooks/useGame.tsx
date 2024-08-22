import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import uniqBy from "lodash/uniqBy";

export type Teams = "Vampyrerna" | "Vampyrjägarna";

export type Happening = "blodmåne";

type CompletedQuest = { id: number };

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
  completeQuest: (team: Teams, questId: number) => void;
  setPlayerTeam: (team: Teams) => void;
  playerTeam: Teams | undefined;
  hasCompletedQuest: (id: number) => boolean;
  endGame: (team: Teams) => void;
  winner: Teams | undefined;
  triggerHappening: (happening: Happening) => void;
  happening: Happening | undefined;
  setHappening: (value: Happening | undefined) => void;
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
  completeQuest: function (team: Teams, questId: number): void {
    throw new Error("Function not implemented.");
  },
  setPlayerTeam: function (team: Teams): void {
    throw new Error("Function not implemented.");
  },
  playerTeam: undefined,
  hasCompletedQuest: function (id: number): boolean {
    throw new Error("Function not implemented.");
  },
  endGame: function (team: Teams): void {
    throw new Error("Function not implemented.");
  },
  winner: undefined,
  triggerHappening: function (happening: Happening): void {
    throw new Error("Function not implemented.");
  },
  happening: undefined,
  setHappening: function (happening: Happening | undefined): void {
    throw new Error("Function not implemented.");
  },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [endTime, setEndTime] = useState<number>();
  const [humanCompletedQuests, setHumanCompletedQuests] = useState<
    CompletedQuest[]
  >([]);
  const [vampireCompletedQuests, setVampireCompletedQuests] = useState<
    CompletedQuest[]
  >([]);
  const [playerTeam, setPlayerTeam] = useState<Teams>();
  const [winner, setWinner] = useState<Teams>();
  const [happening, setHappening] = useState<Happening | undefined>("blodmåne");

  useEffect(() => {
    if (window !== undefined) {
      setIsHost(sessionStorage.getItem("host") === "true");
    }
  }, []);

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const setToHost = () => {
    setIsHost(true);
    sessionStorage.setItem("host", "true");
  };

  const updatePlayers = (newPlayers: Player[]) => {
    const allPlayers = [...players, ...newPlayers];
    const uniquePlayers: Player[] = uniqBy(allPlayers, "name");

    setPlayers([...uniquePlayers]);
  };

  const completeQuest = (team: Teams, questId: number) => {
    if (team === "Vampyrerna") {
      setVampireCompletedQuests([...vampireCompletedQuests, { id: questId }]);
      return;
    }
    setHumanCompletedQuests([...humanCompletedQuests, { id: questId }]);
  };

  const hasCompletedQuest = (questId: number): boolean => {
    if (playerTeam === "Vampyrerna") {
      return vampireCompletedQuests.some((quest) => quest.id === questId);
    }
    return humanCompletedQuests.some((quest) => quest.id === questId);
  };

  const endGame = (team: Teams) => {
    setWinner(team);
  };

  const triggerHappening = (happening: Happening) => {
    setHappening(happening);
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
        humanScore: humanCompletedQuests.length,
        vampireScore: vampireCompletedQuests.length,
        completeQuest,
        playerTeam,
        setPlayerTeam,
        hasCompletedQuest,
        endGame,
        winner,
        triggerHappening,
        happening,
        setHappening,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
