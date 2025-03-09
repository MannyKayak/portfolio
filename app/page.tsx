"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import DialogBox from "@/components/DialogBox";
import { Game } from "@/classes";
import { useGameContext } from "./context/GameContext";

// Componente React
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentBuilding, setCurrentBuilding] = useState<{
    message: string;
    page: string;
  } | null>(null);
  // use game context to get player information and position
  const { playerPosition, updatePlayerPosition } = useGameContext();
  const router = useRouter();

  const handleBox = (choice: string) => {
    // emit a custome event to make player move again and notify the user choice
    if (!choice) return;
    switch (choice) {
      case "enter":
        setCurrentBuilding(null);
        if (currentBuilding?.page) {
          router.push(currentBuilding?.page);
          // go to the selected page
        }
        break;
      case "exit":
        const boxClosing = new CustomEvent("boxClosing", {
          detail: "Box is closed",
        });
        window.dispatchEvent(boxClosing);
        setCurrentBuilding(null);
        break;
    }
  };

  useEffect(() => {
    // listener for the events
    const handleEntrance = (e: CustomEvent) => {
      updatePlayerPosition({
        x: e.detail.respawnPosition.x,
        y: e.detail.respawnPosition.y,
        frame: e.detail.respawnPosition.frame,
        direction: e.detail.respawnPosition.direction,
      });
      // this switch is used to show different messages depending on the building the user is entering in
      setCurrentBuilding({
        message: e.detail.message,
        page: e.detail.page,
      });
    };

    window.addEventListener(
      "buildingEntrance",
      handleEntrance as EventListener
    );

    return () => {
      // Importante: rimuovere il listener per evitare memory leak
      window.removeEventListener(
        "buildingEntrance",
        handleEntrance as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      new Game(canvasRef.current, playerPosition); // Inizializza il gioco
    } else {
      // render error page
      console.error("Canvas not found");
    }
  }, [canvasRef]);
  return (
    <div className="fixed m-0 justify-center items-center bg-black">
      <canvas ref={canvasRef} className="bg-slate-300" />
      {currentBuilding && (
        <DialogBox message={currentBuilding.message} handlePress={handleBox} />
      )}
    </div>
  );
}
