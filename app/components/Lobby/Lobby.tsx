import { Player, useGame } from "@/app/hooks/useGame";
import { useSupabaseClient } from "@/app/hooks/useSupabaseClient";
import { ViewState } from "@/app/page";
import Image from "next/image";
import { Button } from "../Button/Button";

type LobbyProps = {
  viewState: ViewState;
  setViewState: (value: ViewState) => void;
  roomCode: string;
};

const PlayerCard = ({ player }: { player: Player }) => {
  const src = player.team === "Vampyrerna" ? "/vampire.png" : "/human.png";
  return (
    <div className="flex">
      {player.isHost && <p>crown</p>}
      <Image src={src} width={44} height={56} alt="Vampyrjägare" />
      {player.name}
    </div>
  );
};

export const Lobby = ({ viewState, roomCode }: LobbyProps) => {
  const game = useGame();
  const client = useSupabaseClient(roomCode);
  return (
    <>
      {viewState === "lobby" && (
        <div>
          <h1>Spelkod: {roomCode}</h1>
          <h3>Inväntar spelare...</h3>
          <div>
            {game.players.map((player, index) => (
              <PlayerCard
                player={player}
                key={`${player.name}_${player.team}_${index}`}
              />
            ))}
          </div>
          {game.isHost && (
            <div>
              <Button onClick={client.startGame} text="Starta spel" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
