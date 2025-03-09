"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface PlayerPosition {
  x: number;
  y: number;
  frame: number;
  direction: string;
}

interface GameContextProps {
  playerPosition: PlayerPosition;
  updatePlayerPosition: (newPosition: PlayerPosition) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState({
    x: 1152,
    y: 640,
    frame: 0,
    direction: "down",
  });

  const updatePlayerPosition = (newPosition: PlayerPosition) => {
    setPlayerPosition(newPosition);
  };
  return (
    <GameContext.Provider value={{ playerPosition, updatePlayerPosition }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};
