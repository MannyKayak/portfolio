"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";

import { Game } from "@/classes";
import { useGameContext } from "./context/GameContext";
import PanelBox from "@/components/PanelBox";
import DialogBox from "@/components/DialogBox";
import UiPanel from "@/components/UiPanel";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentBuilding, setCurrentBuilding] = useState<{
    message: string;
    page: string;
  } | null>(null);
  const [panel, setPanel] = useState<string | null>(null);
  const [npcDialog, setNpcDialog] = useState<string[] | null>(null);
  const [npcDialogIndex, setNpcDialogIndex] = useState<number>(0);
  const [uiPanelPosition, setUiPanelPosition] = useState({
    x: innerWidth - innerHeight * 0.9,
    y: innerHeight - innerHeight * 0.9,
  });

  const { playerPosition, updatePlayerPosition } = useGameContext();
  const router = useRouter();

  const boxClosing = new CustomEvent("boxClosing", { detail: "Box is closed" });

  const handleBox = (choice: string) => {
    if (!choice) return;

    if (npcDialog) {
      if (npcDialogIndex < npcDialog.length - 1) {
        setNpcDialogIndex(npcDialogIndex + 1);
      } else {
        setNpcDialog(null);
        setNpcDialogIndex(0);
        window.dispatchEvent(boxClosing);
      }
      return;
    }

    switch (choice) {
      case "enter":
        setCurrentBuilding(null);
        if (currentBuilding?.page) router.push(currentBuilding.page);
        break;
      case "exit":
        window.dispatchEvent(boxClosing);
        setCurrentBuilding(null);
        break;
    }
  };

  const handlePanel = () => {
    setPanel(null);
    window.dispatchEvent(boxClosing);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { delta } = event;

    setUiPanelPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  }

  useEffect(() => {
    const handleEntrance = (e: CustomEvent) => {
      updatePlayerPosition({
        x: e.detail.respawnPosition.x,
        y: e.detail.respawnPosition.y,
        frame: e.detail.respawnPosition.frame,
        direction: e.detail.respawnPosition.direction,
      });
      setCurrentBuilding({ message: e.detail.message, page: e.detail.page });
    };

    const handlePanelActivation = (e: CustomEvent) => {
      setPanel(e.detail.panel);
    };

    const handleNpcDialogue = (e: CustomEvent) => {
      const dialogues = e.detail.dialogues;
      if (dialogues && dialogues.length > 0) {
        setNpcDialog(dialogues);
        setNpcDialogIndex(0);
      }
    };

    window.addEventListener(
      "buildingEntrance",
      handleEntrance as EventListener
    );
    window.addEventListener(
      "panelActivation",
      handlePanelActivation as EventListener
    );
    window.addEventListener("npcDialogue", handleNpcDialogue as EventListener);

    return () => {
      window.removeEventListener(
        "buildingEntrance",
        handleEntrance as EventListener
      );
      window.removeEventListener(
        "panelActivation",
        handlePanelActivation as EventListener
      );
      window.removeEventListener(
        "npcDialogue",
        handleNpcDialogue as EventListener
      );
    };
  }, [updatePlayerPosition]);

  useEffect(() => {
    if (canvasRef.current) {
      new Game(canvasRef.current, playerPosition);
    } else {
      console.error("Canvas not found");
    }
  }, [canvasRef]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="fixed m-0 justify-center items-center bg-black">
        {currentBuilding && (
          <DialogBox
            message={currentBuilding.message}
            handlePress={handleBox}
          />
        )}

        <UiPanel position={uiPanelPosition} />
        {panel && <PanelBox panelName={panel} handlePress={handlePanel} />}

        {npcDialog && (
          <DialogBox
            message={npcDialog[npcDialogIndex]}
            handlePress={handleBox}
          />
        )}
        <canvas ref={canvasRef} className="bg-slate-300" />
      </div>
    </DndContext>
  );
}
