import { rectangularCollision } from "@/app/utils/Functions";

interface Position {
  x: number;
  y: number;
}

interface Dialogues {
  collision?: string[];
  special?: string[];
}

interface NpcOptions {
  position: Position;
  type: "static" | "dynamic";
  dialogues?: Dialogues;
  spriteUrl: string;
  staticDimensions?: { width: number; height: number };
  debug?: boolean;
  anticipationPixels?: number;
}

export default class Npc {
  position: Position;
  width: number;
  height: number;
  velocity = { x: 0, y: 0 };
  image = new Image();
  loaded = false;
  type: "static" | "dynamic";
  debug: boolean;
  anticipationPixels: number;

  currentDirection: "down" | "up" | "left" | "right" = "down";
  currentFrame = 0;
  elapsedTime = 0;
  frameInterval = 0.2;

  hitbox: { position: Position; width: number; height: number; show: boolean };

  dialogues: Dialogues;

  constructor(options: NpcOptions) {
    this.position = options.position;
    this.type = options.type;
    this.debug = options.debug || false;
    this.anticipationPixels = options.anticipationPixels || 8;

    this.width = options.staticDimensions?.width || 64;
    this.height = options.staticDimensions?.height || 64;

    this.hitbox = {
      position: {
        x: this.position.x + this.width * 0.1 - this.anticipationPixels,
        y: this.position.y + this.height * 0.1 - this.anticipationPixels,
      },
      width: this.width * 0.8 + this.anticipationPixels * 2,
      height: this.height * 0.8 + this.anticipationPixels * 2,
      show: this.debug,
    };

    this.dialogues = options.dialogues || { collision: [], special: [] };

    this.image.src = options.spriteUrl;
    this.image.onload = () => (this.loaded = true);
  }

  checkCollision(playerHitbox: {
    position: Position;
    width: number;
    height: number;
  }) {
    return rectangularCollision({
      rectangle1: playerHitbox,
      rectangle2: this.hitbox,
    });
  }

  interact(eventType: "collision" | "special") {
    const dialogues = this.dialogues[eventType];
    if (dialogues && dialogues.length > 0) {
      window.dispatchEvent(
        new CustomEvent("npcDialogue", {
          detail: { dialogues },
        })
      );
    }
  }

  detectPlayerCollisionSide(
    playerPosition: Position
  ): "down" | "up" | "left" | "right" | null {
    const dx = playerPosition.x - this.position.x;
    const dy = playerPosition.y - this.position.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left";
    } else if (Math.abs(dy) > Math.abs(dx)) {
      return dy > 0 ? "down" : "up";
    }

    return null;
  }

  turnTowardsPlayer(playerPosition: Position) {
    const side = this.detectPlayerCollisionSide(playerPosition);
    if (side) {
      this.currentDirection = side;
    }
  }

  showHitbox(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,255,0.3)";
    ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    const directions = { down: 0, up: 1, left: 2, right: 3 };
    const directionIndex = directions[this.currentDirection];

    ctx.drawImage(
      this.image,
      64 * directionIndex,
      0,
      64,
      64,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.hitbox.show) {
      this.showHitbox(ctx);
    }
  }

  update(deltaTime: number) {
    // Add dynamic NPC movement logic here if required
  }
}
