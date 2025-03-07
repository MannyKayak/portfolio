"use client";

import React, { useEffect, useRef, useState } from "react";
import { Background, Boundary, Player, InputManager } from "@/classes";
import { generateBoundariesMap } from "./utils/Functions";
import { draw_entry_zones, entry_zones } from "./utils/Boundaries";
import DialogBox from "@/components/DialogBox";
import { useRouter } from "next/navigation";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  // static elements
  background: Background | undefined;
  foreground: Background | undefined;
  // collision elements
  boundaries: Boundary[] = [];
  inputManager: InputManager;

  keys: { [key: string]: { pressed: boolean; isLast: boolean } } = {
    ArrowLeft: { pressed: false, isLast: false },
    ArrowRight: { pressed: false, isLast: false },
    ArrowUp: { pressed: false, isLast: false },
    ArrowDown: { pressed: false, isLast: false },
  };
  lastTime: number = performance.now();

  // screen settings
  dpr: number = devicePixelRatio || 1;

  TILE_WIDTH: number = 64;
  TILE_HEIGHT: number = 64;

  MAP_COLS: number = 40;
  MAP_ROWS: number = 30;

  MAP_WIDTH: number = this.TILE_WIDTH * this.MAP_COLS;
  MAP_HEIGHT: number = this.TILE_HEIGHT * this.MAP_ROWS;

  MAP_SCALE: number = this.dpr - 1;

  VIEWPORT_WIDTH: number;
  VIEWPORT_HEIGHT: number;

  VIEWPORT_CENTER_X: number;
  VIEWPORT_CENTER_Y: number;
  MAX_SCROLL_X: number;
  MAX_SCROLL_Y: number;

  constructor(
    canvas: HTMLCanvasElement,
    initialPosition: { x: number; y: number }
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // initialize canvas dimensions
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.VIEWPORT_WIDTH = this.canvas.width / this.MAP_SCALE;
    this.VIEWPORT_HEIGHT = this.canvas.height / this.MAP_SCALE;

    this.VIEWPORT_CENTER_X = this.VIEWPORT_WIDTH / 2;
    this.VIEWPORT_CENTER_Y = this.VIEWPORT_HEIGHT / 2;

    this.MAX_SCROLL_X = this.MAP_WIDTH - this.VIEWPORT_WIDTH;
    this.MAX_SCROLL_Y = this.MAP_HEIGHT - this.VIEWPORT_HEIGHT;
    // *****************************************************************

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    const backgroundImage = new Image();
    backgroundImage.src = "/images/assets/portfolio_city.png";

    const foregroundImage = new Image();
    foregroundImage.src = "/images/assets/portfolio_city_foreground.png";

    // creation collision boundaries on the map
    this.boundaries = generateBoundariesMap({
      cols: this.MAP_COLS,
      rows: this.MAP_ROWS,
      tileWidth: this.TILE_WIDTH,
      tileHeight: this.TILE_HEIGHT,
    });

    backgroundImage.onload = () => {
      this.background = new Background(
        0,
        0,
        backgroundImage.width,
        backgroundImage.height,
        backgroundImage
      );
      this.foreground = new Background(
        0,
        0,
        foregroundImage.width,
        foregroundImage.height,
        foregroundImage
      );

      // initial translation to spawn the player in the center of the background
    };

    if (initialPosition) {
      this.player = new Player(initialPosition.x, initialPosition.y + 40);
    } else {
      this.player = new Player(this.MAP_WIDTH / 2, this.MAP_HEIGHT / 2);
    }

    this.inputManager = new InputManager(this.player.isMovementBlocked);

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.VIEWPORT_WIDTH = this.canvas.width / this.MAP_SCALE;
      this.VIEWPORT_HEIGHT = this.canvas.height / this.MAP_SCALE;

      this.VIEWPORT_CENTER_X = this.VIEWPORT_WIDTH / 2;
      this.VIEWPORT_CENTER_Y = this.VIEWPORT_HEIGHT / 2;

      this.MAX_SCROLL_X = this.MAP_WIDTH - this.VIEWPORT_WIDTH;
      this.MAX_SCROLL_Y = this.MAP_HEIGHT - this.VIEWPORT_HEIGHT;
    });

    // Start the game loop
    this.animate();
  }

  animate = () => {
    // calculate delta time - time between frames
    let currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // clamp horizontal and vertical scrolling
    const horizontalScrollDistance = Math.min(
      Math.max(0, this.player.center.x - this.VIEWPORT_CENTER_X),
      this.MAX_SCROLL_X
    );
    const verticalScrollDistance = Math.min(
      Math.max(0, this.player.center.y - this.VIEWPORT_CENTER_Y),
      this.MAX_SCROLL_Y
    );

    // Draw elements
    this.ctx.save();
    this.ctx.scale(this.MAP_SCALE, this.MAP_SCALE);
    this.ctx.translate(-horizontalScrollDistance, -verticalScrollDistance);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.background) this.background.draw(this.ctx);
    this.boundaries.forEach((boundary) => {
      boundary.draw(this.ctx);
    });
    this.player.draw(this.ctx);
    this.inputManager.isPlayerBlocked = this.player.isMovementBlocked;
    this.player.handleUserInput(this.inputManager.keys);
    this.player.update(deltaTime, this.boundaries);

    this.foreground?.draw(this.ctx);

    // draw entry zone for buildings - debug funciton
    draw_entry_zones(this.ctx);
    this.ctx.restore();
    requestAnimationFrame(this.animate);
  };
}

// Componente React
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentBuilding, setCurrentBuilding] = useState<{
    message: string;
    page: string;
  } | null>(null);
  const homePosition = entry_zones.find(
    (element) => element.page === "aboutMe"
  ); // by dafault the position is the one of the home exit point
  const [initialPosition, setInitialPosition] = useState(
    homePosition ? homePosition.position : { x: 1152, y: 600 }
  );
  const router = useRouter();

  const handleBox = (choice: string) => {
    // emit a custome event to make player move again and notify the user choice
    if (choice === undefined) {
      return; // non fare niente se non viene specificato il risultato
    }
    switch (choice) {
      case "enter":
        setCurrentBuilding(null);
        if (currentBuilding?.page != undefined) {
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
    }
  };

  useEffect(() => {
    // listener for the events
    const handleEntrance = (e: CustomEvent) => {
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
      new Game(canvasRef.current, initialPosition); // Inizializza il gioco
    } else {
      // render error page
      console.error("Canvas not found");
    }
  }, []);
  return (
    <div className="fixed m-0 justify-center items-center bg-black">
      <canvas ref={canvasRef} className="bg-slate-300" />
      {currentBuilding && (
        <DialogBox message={currentBuilding.message} handlePress={handleBox} />
      )}
    </div>
  );
}
