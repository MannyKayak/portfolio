import { Background, Boundary, Player, InputManager, Npc } from "@/classes";
import { generateBoundariesMap } from "@/app/utils/Functions";
import { collisions, fabion, npcCollisions, panels } from "@/app/data";
import { entry_zones } from "@/app/utils/Boundaries";
import { rectangularCollision } from "@/app/utils/Functions";
import { TfiControlShuffle } from "react-icons/tfi";

export default class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  npcs: Npc[] = [];
  // static elements
  background: Background | undefined;
  foreground: Background | undefined;
  // collision elements
  boundaries: Boundary[] = [];
  panelCollisionMap: Boundary[] = [];
  staticNpcMap: Boundary[] = [];

  inputManager: InputManager;
  // object to take track of the key pressed by the user
  keys: { [key: string]: { pressed: boolean; isLast: boolean } } = {
    ArrowLeft: { pressed: false, isLast: false },
    ArrowRight: { pressed: false, isLast: false },
    ArrowUp: { pressed: false, isLast: false },
    ArrowDown: { pressed: false, isLast: false },
  };
  // temporal variable used for animation
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
  // Animation index
  animationId: number = 0;
  speakingDistance: number = 5;

  // TODO: Da valutare se tenere initial position o meno
  constructor(
    canvas: HTMLCanvasElement,
    initialPosition: { x: number; y: number; direction: string; frame: number }
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

    // creation of image classes for background and foreground
    const backgroundImage = new Image();
    backgroundImage.src = "/images/assets/portfolio_city.png";
    const foregroundImage = new Image();
    foregroundImage.src = "/images/assets/portfolio_city_foreground.png";

    // creation collision boundaries on the map
    this.boundaries = generateBoundariesMap(
      {
        cols: this.MAP_COLS,
        rows: this.MAP_ROWS,
        tileWidth: this.TILE_WIDTH,
        tileHeight: this.TILE_HEIGHT,
      },
      collisions
    );

    // creation of panel collision map
    this.panelCollisionMap = generateBoundariesMap(
      {
        cols: this.MAP_COLS,
        rows: this.MAP_ROWS,
        tileWidth: this.TILE_WIDTH,
        tileHeight: this.TILE_HEIGHT,
      },
      panels
    );

    this.staticNpcMap = generateBoundariesMap(
      {
        cols: this.MAP_COLS,
        rows: this.MAP_ROWS,
        tileWidth: this.TILE_WIDTH,
        tileHeight: this.TILE_HEIGHT,
      },
      npcCollisions
    );

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
    };

    // position player on initial position
    if (initialPosition) {
      this.player = new Player(initialPosition);
      console.log(
        "initial coordinates in Game class:",
        initialPosition.x,
        initialPosition.y
      );
    } else {
      this.player = new Player({
        x: this.MAP_WIDTH / 2,
        y: this.MAP_HEIGHT / 2,
        frame: 0,
        direction: "down",
      });
    }

    // initialization of npcs
    this.initializeNpcs();

    // the input manager is a class that manages user input events
    this.inputManager = new InputManager(this.player.isMovementBlocked);

    // method to manage screen dimansions in case of resize event
    this.resizeListener();
    this.gameEventListener();

    // Start the game loop
    this.animate();
  }

  animate = () => {
    // TIMEFRAME FOR ANIMATION: calculate delta time - time between frames
    let currentTime = performance.now();
    const deltaTime = Math.min(0.2, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    // CAMERA MOTION: clamp horizontal and vertical scrolling
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

    //------- draw collision boundaries on the map ------------
    // this.boundaries.forEach((boundary) => {
    //   boundary.draw(this.ctx);
    // });

    // this.panelCollisionMap.forEach((panel) => {
    //   panel.draw(this.ctx);
    // });
    // -------------------------------------------------------------------------

    // Draw NPCs and check for interactions

    this.npcs.forEach((npc) => {
      npc.draw(this.ctx);
    });

    // draw player
    this.player.draw(this.ctx);
    this.inputManager.isPlayerBlocked = this.player.isMovementBlocked;

    this.animationId = requestAnimationFrame(this.animate);
    if (!this.player.isMovementBlocked)
      this.player.handleUserInput(this.inputManager.keys);
    this.player.update(deltaTime, this.boundaries, this.panelCollisionMap);
    this.npcs.forEach((npc) => {
      if (npc.checkCollision(this.player.hitbox)) {
        this.player.isMovementBlocked = true;
        npc.turnTowardsPlayer({ x: this.player.x, y: this.player.y });
        npc.interact("collision");
      }
      npc.update(deltaTime);
      this.player.isMovementBlocked = false;
    });

    this.checkKayakGameEntry();

    this.foreground?.draw(this.ctx);

    // draw entry zone for buildings - debug funciton
    // draw_entry_zones(this.ctx);
    this.ctx.restore();
  };

  // Metodo per controllare ingresso Kayak Game
  checkKayakGameEntry() {
    const kayakEntryZone = entry_zones.find(
      (zone) => zone.page === "kayakGame"
    );
    if (
      kayakEntryZone &&
      rectangularCollision({
        rectangle1: this.player.hitbox,
        rectangle2: kayakEntryZone,
      })
    ) {
      const npcNear = this.npcs.find((npc) => {
        const distance = Math.hypot(
          this.player.center.x - (npc.position.x + npc.width / 2),
          this.player.center.y - (npc.position.y + npc.height / 2)
        );
        return distance < this.speakingDistance * this.TILE_WIDTH;
      });

      if (npcNear) {
        npcNear.interact("special");
        // Blocca movimento se necessario
        this.player.isMovementBlocked = true;
        cancelAnimationFrame(this.animationId);
      } else {
        // Se nessun NPC vicino, evento generico
        const kayakGameEvent = new CustomEvent("kayakGameEntry");
        window.dispatchEvent(kayakGameEvent);
      }
    }
  }

  // Metodo per inizializzare NPC
  initializeNpcs() {
    const fabionNpc = new Npc({
      position: { x: 640, y: 1024 },
      type: "static",
      dialogues: fabion,
      spriteUrl: "/images/assets/npc-fabione.png",
      debug: true,
    });

    this.npcs.push(fabionNpc);
  }

  resizeListener() {
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
  }

  handleBoxClosing = () => {
    // resume animation loop
    console.log("back to game");
    this.animate();

    this.player.isMovementBlocked = false;
    switch (this.player.walkDirection) {
      case "left":
        // player shift to the right at same y
        this.player.x = this.player.x + this.player.width / 2;
        this.player.currentSprite = this.player.sprites.walkRight;
        this.player.currentSprite.frameCount = 3;
        break;
      case "right":
        this.player.x = this.player.x - this.player.width / 2;
        this.player.currentSprite = this.player.sprites.walkLeft;
        this.player.currentSprite.frameCount = 2;
        break;
      case "up":
        this.player.y = this.player.y + this.player.height / 2;
        // spawn it facing the opposite direction
        this.player.currentSprite = this.player.sprites.walkDown;
        this.player.currentSprite.frameCount = 0;
        break;
      case "down":
        this.player.y = this.player.y - this.player.height / 2;
        this.player.currentSprite = this.player.sprites.walkUp;
        this.player.currentSprite.frameCount = 1;
        break;
    }
  };

  handleBuildEntrance = () => {
    // stop animation loop
    cancelAnimationFrame(this.animationId);
  };

  handleReturnHome = () => {
    this.player.isMovementBlocked = false;
  };

  handlePanelActivation = () => {
    cancelAnimationFrame(this.animationId);
  };

  handleNpcinteraction = (e: CustomEvent) => {
    console.log("NPC interaction", e.detail);
    // stop player movement animation
    this.player.isMovementBlocked = true;
  };
  // method that listens to all game events
  gameEventListener() {
    window.addEventListener("boxClosing", this.handleBoxClosing);
    window.addEventListener("buildingEntrance", this.handleBuildEntrance);
    window.addEventListener("returnHome", this.handleReturnHome);
    window.addEventListener("panelActivation", this.handlePanelActivation);
    window.addEventListener(
      "npcInteraction",
      this.handleNpcinteraction as EventListener
    );
  }

  destroy() {
    window.removeEventListener("boxClosing", this.handleBoxClosing);
    window.removeEventListener("buildingEntrance", this.handleBuildEntrance);
    window.removeEventListener("returnHome", this.handleReturnHome);
    window.removeEventListener("panelActivation", this.handlePanelActivation);
    window.removeEventListener(
      "npcInteraction",
      this.handleNpcinteraction as EventListener
    );
    cancelAnimationFrame(this.animationId);
  }
}
