import { rectangularCollision } from "@/app/utils/Functions";

interface Position {
  x: number;
  y: number;
}

interface NpcOptions {
  position: Position;
  type: "static" | "mobile";
  path?: Position[];
  dialogues: {
    collision?: string[];
    special?: string[];
  };
  width?: number;
  height?: number;
  spriteUrl: string;
}

export default class Npc {
  position: Position;
  width: number;
  height: number;
  dialogues: {
    collision: string[];
    special: string[];
  };
  type: "static" | "mobile";
  path?: Position[];
  currentPathIndex: number;
  speed: number;
  hitbox: { position: Position; width: number; height: number };
  currentFrame: number;
  sprite: HTMLImageElement;
  loaded: boolean;

  constructor(npcOptions: {
    position: Position;
    type: "static" | "mobile";
    dialogues: Dialogues;
    spriteUrl: string;
    path?: Position[];
    width: number;
    height: number;
  }) {
    this.position = npcOptions.position;
    this.width = npcOptions.width;
    this.height = npcOptions.height;
    this.dialogues = {
      collision: npcOptions.dialogues.collision || [],
      special: npcOptions.dialogues.special || [],
    };
    this.currentFrame = 0;

    this.hitbox = {
      position: { x: this.position.x, y: this.position.y },
      width: this.width * 0.8,
      height: this.height * 0.9,
    };

    this.speed = 100;
    this.type = npcOptions.type;
    this.path =
      npcOptions.type === "mobile" && npcOptions.path ? npcOptions.path : [];
    this.currentPathIndex = 0;

    this.sprite = new Image();
    this.loaded = false;
    this.sprite.onload = () => {
      this.loaded = true;
    };
    this.sprite.src = npcOptions.spriteUrl;
  }

  update(deltaTime: number) {
    if (this.path && this.type === "mobile") {
      this.moveAlongPath(deltaTime);
    }
  }

  moveAlongPath(deltaTime: number) {
    if (!this.path || this.path.length === 0) return;

    const target = this.path[this.currentPathIndex];
    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 1) {
      this.currentPathIndex = (this.currentPathIndex + 1) % this.path.length;
    } else {
      this.position.x += (dx / distance) * this.speed * deltaTime;
      this.position.y += (dy / distance) * this.speed * deltaTime;
      this.hitbox.position = { x: this.position.x, y: this.position.y };
    }
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
      const dialogueEvent = new CustomEvent("npcDialogue", {
        detail: { dialogues, type: eventType },
      });
      console.log(dialogues, eventType);
      window.dispatchEvent(dialogueEvent);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    ctx.drawImage(
      this.sprite,
      0,
      this.height * this.currentFrame,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
