"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

class Car {
  static speed: number = 5;
  x: number;
  y: number;
  width: number;
  height: number;
  shiftSpeed: number = 5;
  centralBorderLeft: number;
  centralBorderRight: number;

  constructor(
    initialPosition: { x: number; y: number },
    width: number,
    height: number
  ) {
    this.x = initialPosition.x;
    this.y = initialPosition.y;
    this.width = width;
    this.height = height;

    this.centralBorderLeft = window.innerWidth / 2 - this.width / 2;
    this.centralBorderRight = window.innerWidth / 2 + this.width / 2;
    this.mouseListener();
  }

  mouseListener() {
    window.addEventListener("mousemove", (e) => {
      if (e.clientX < this.centralBorderLeft) {
        this.shiftSpeed = -Car.speed;
      } else if (e.clientX > this.centralBorderRight) {
        this.shiftSpeed = Car.speed;
      } else {
        this.shiftSpeed = 0;
      }
    });
  }

  detectScreenBorders() {
    if (this.x + this.width >= window.innerWidth || this.x <= 0) {
      return true;
    }
    return false;
  }
  update() {
    const prevX = this.x;
    if (this.detectScreenBorders()) {
      this.x = prevX;
    }
    this.x += this.shiftSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Obstacle {
  static zeroHeight: number = 100;
  static zeroWidth: number = 40;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(initialPosition: { x: number; y: number }) {
    this.x = initialPosition.x;
    this.y = initialPosition.y;
    this.width = Obstacle.zeroWidth;
    this.height = Obstacle.zeroHeight;
  }

  update() {
    this.y += 5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Background {
  canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // background
    ctx.fillStyle = "green";
    ctx.fillRect(
      0,
      this.canvas.height - 300,
      this.canvas.width,
      this.canvas.height
    );

    // road
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.moveTo((this.canvas.width * 2) / 5, this.canvas.height - 300);
    ctx.lineTo((this.canvas.width * 3) / 5, this.canvas.height - 300);
    ctx.lineTo((this.canvas.width * 4) / 5, this.canvas.height);
    ctx.lineTo((this.canvas.width * 1) / 5, this.canvas.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

class AboutMeGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  playerWidth: number;
  playerHeight: number;
  playerX: number;
  playerY: number;
  car: Car;
  obstacle: Obstacle;
  background: Background;
  isRaceStarted: boolean = false;
  animationFrameId: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.playerWidth = 100;
    this.playerHeight = 50;

    this.playerX = this.canvas.width / 2 - this.playerWidth / 2;
    this.playerY = this.canvas.height - 150;

    // this.isRaceStarted = false;
    this.car = new Car(
      { x: this.playerX, y: this.playerY },
      this.playerWidth,
      this.playerHeight
    );

    this.obstacle = new Obstacle({
      x: this.canvas.width / 2,
      y: this.canvas.height - 400,
    });

    this.background = new Background(this.canvas);
    this.background.draw(this.ctx);
    this.car.draw(this.ctx);
    this.obstacle.draw(this.ctx);
    this.raceEventListener();
  }

  animate() {
    if (!this.isRaceStarted) return;
    console.log("animating");
    // this.car.update();
    this.obstacle.update();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw(this.ctx);
    this.car.draw(this.ctx);
    this.obstacle.draw(this.ctx);
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  raceEventListener() {
    const handleRaceEvent = (e: CustomEvent) => {
      console.log(e.detail.raceStatus);

      if (e.detail.raceStatus) {
        this.isRaceStarted = true;
        this.animate();
      } else {
        this.isRaceStarted = false;
        cancelAnimationFrame(this.animationFrameId);
      }
    };

    window.addEventListener("raceEvent", handleRaceEvent as EventListener);
  }

  destroy() {
    window.removeEventListener("raceEvent", () => {});
  }
}

export default function AboutMe() {
  const raceGameRef = useRef<HTMLCanvasElement | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isRaceStarted, setRaceStarted] = useState<boolean>(false);
  const handleReturnHome = () => {
    // throw return event
    const returnHome = new CustomEvent("returnHome", {
      detail: {
        fromPage: "aboutMe",
      },
    });
    window.dispatchEvent(returnHome);
  };

  const launchStartStopGameEvent = () => {
    setRaceStarted(!isRaceStarted);
    const raceStarted = new CustomEvent("raceEvent", {
      detail: { raceStatus: !isRaceStarted },
    });
    window.dispatchEvent(raceStarted);
  };

  useEffect(() => {
    if (raceGameRef.current) {
      new AboutMeGame(raceGameRef.current);
    } else {
      throw new Error("Canvas element not found");
    }
  }, []);
  return (
    <div className="bg-teal-200 ">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="absolute bottom-10 right-10 bg-slate-700 shadow-slate-950 shadow-md rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-10 m-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>

        {showOptions && (
          <div className="absolute bottom-full right-0 mb-2 bg-slate-400 p-4 rounded-lg shadow-md whitespace-nowrap">
            <Link href="/">
              <div className="text-white text-lg">Return Home</div>
            </Link>
            <div onClick={launchStartStopGameEvent}>
              {isRaceStarted ? "Stop Game" : "Start Game"}
            </div>
          </div>
        )}
      </button>

      <canvas ref={raceGameRef} />
    </div>
  );
}
