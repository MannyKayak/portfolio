import { rectangularCollision } from "@/app/utils/Functions";
import { Boundary } from "@/classes";
import { entry_zones, panel_positions } from "@/app/utils/Boundaries";

export default class Player {
  // static values for player movement
  static X_VELOCITY: number = 250;
  static Y_VELOCITY: number = 250;
  // player properties
  x: number;
  y: number;
  width: number = 64;
  height: number = 64;
  velocity: { x: number; y: number } = { x: 0, y: 0 };
  image: HTMLImageElement = new Image();
  center: { x: number; y: number };
  loaded: boolean = false;

  // animation time props
  currentFrame: number = 0;
  elapsedTime: number = 0;

  // properties for player movement
  sprites: {
    walkDown: {
      x: number;
      y: number;
      width: number;
      height: number;
      frameCount: number;
    };
    walkUp: {
      x: number;
      y: number;
      width: number;
      height: number;
      frameCount: number;
    };
    walkLeft: {
      x: number;
      y: number;
      width: number;
      height: number;
      frameCount: number;
    };
    walkRight: {
      x: number;
      y: number;
      width: number;
      height: number;
      frameCount: number;
    };
  } = {
    walkDown: { x: 0, y: 0, width: 64, height: 64, frameCount: 4 },
    walkUp: { x: 64, y: 0, width: 64, height: 64, frameCount: 4 },
    walkLeft: { x: 128, y: 0, width: 64, height: 64, frameCount: 4 },
    walkRight: { x: 192, y: 0, width: 64, height: 64, frameCount: 4 },
  };
  currentSprite: {
    x: number;
    y: number;
    width: number;
    height: number;
    frameCount: number;
  };
  hitbox: {
    position: { x: number; y: number };
    width: number;
    height: number;
    show: boolean;
  };
  isMovementBlocked: boolean;
  walkDirection: string;

  constructor(initialPosition: {
    x: number;
    y: number;
    direction: string;
    frame: number;
  }) {
    this.x = initialPosition.x;
    this.y = initialPosition.y;

    this.isMovementBlocked = false;
    this.walkDirection = initialPosition.direction;

    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = "/images/assets/player.png";

    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };

    switch (this.walkDirection) {
      case "down":
        this.currentSprite = this.sprites.walkDown;
        break;
      case "up":
        this.currentSprite = this.sprites.walkUp;
        break;
      case "left":
        this.currentSprite = this.sprites.walkLeft;
        break;
      case "right":
        this.currentSprite = this.sprites.walkRight;
        break;
      default:
        this.currentSprite = this.sprites.walkDown;
    }
    this.hitbox = {
      position: { x: this.x, y: this.y },
      width: this.width * 0.8,
      height: this.height * 0.9,
      show: false,
    };
  }

  // function to check the passage through the entrance of a building use rectangularCollision to check
  checkBuildEntrance() {
    for (let i = 0; i < entry_zones.length; i++) {
      if (
        rectangularCollision({
          rectangle1: this.hitbox,
          rectangle2: entry_zones[i],
        })
      ) {
        return entry_zones[i];
      }
    }
    return null;
  }

  updateHorizontalPosition(deltaTime: number) {
    this.x += this.velocity.x * deltaTime;
  }

  updateVerticalPosition(deltaTime: number) {
    this.y += this.velocity.y * deltaTime;
  }

  detectHorizontalCollision(boundaries: Boundary[]) {
    const buffer = 0.01;
    for (let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i];
      // check collion on all axes
      if (
        rectangularCollision({ rectangle1: this.hitbox, rectangle2: boundary })
      ) {
        // check while player move left
        if (this.velocity.x < 0) {
          this.x = boundary.position.x + boundary.width + buffer;
          return true;
        }

        // check while player move right
        if (this.velocity.x > 0) {
          this.x = boundary.position.x - this.width - buffer;
          return true;
        }
      }
    }
    return false;
  }
  detectVerticalCollision(boundaries: Boundary[]): boolean {
    const buffer = 0.01;
    for (let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i];
      // check collion on all axes
      if (
        rectangularCollision({ rectangle1: this.hitbox, rectangle2: boundary })
      ) {
        // check while player move up
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.y = boundary.position.y + boundary.height + buffer;
          return true;
        }

        // check while player move down
        if (this.velocity.y > 0) {
          this.y = boundary.position.y - this.height - buffer;
          return true;
        }
      }
    }
    return false;
  }

  handleUserInput(keys: {
    [key: string]: { pressed: boolean; isLast: boolean };
  }) {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (keys.ArrowLeft.pressed && keys.ArrowLeft.isLast) {
      this.velocity.x = -Player.X_VELOCITY;
      this.currentSprite = this.sprites.walkLeft;
      this.currentSprite.frameCount = 4;
      this.walkDirection = "left";
    } else if (keys.ArrowRight.pressed && keys.ArrowRight.isLast) {
      this.velocity.x = Player.X_VELOCITY;
      this.currentSprite = this.sprites.walkRight;
      this.currentSprite.frameCount = 4;
      this.walkDirection = "right";
    } else if (keys.ArrowUp.pressed && keys.ArrowUp.isLast) {
      this.velocity.y = -Player.Y_VELOCITY;
      this.currentSprite = this.sprites.walkUp;
      this.currentSprite.frameCount = 4;
      this.walkDirection = "up";
    } else if (keys.ArrowDown.pressed && keys.ArrowDown.isLast) {
      this.velocity.y = Player.Y_VELOCITY;
      this.currentSprite = this.sprites.walkDown;
      this.currentSprite.frameCount = 4;
      this.walkDirection = "down";
    } else {
      this.currentSprite.frameCount = 1;
    }
  }

  detectPanelCollision(panels: Boundary[]) {
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      if (
        rectangularCollision({ rectangle1: this.hitbox, rectangle2: panel })
      ) {
        const activatedPanel = panel_positions.find(
          (item) => item.x === panel.position.x && item.y === panel.position.y
        );
        panel.name = activatedPanel?.name || "panel";
        return { collision: true, panel: panel.name };
      }
    }

    return { collision: false, panel: "" };
  }

  update(
    deltaTime: number,
    boundaries: Boundary[],
    panels: Boundary[],
    staticNpgMap: Boundary[]
  ) {
    if (this.isMovementBlocked) return;
    // Update player position based on keyboard input
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };

    this.elapsedTime += deltaTime;
    const intervalToNextFrame = 0.15;

    if (this.elapsedTime > intervalToNextFrame) {
      this.currentFrame =
        (this.currentFrame + 1) % this.currentSprite.frameCount;
      this.elapsedTime -= intervalToNextFrame;
    }

    const previousX = this.x;
    const previousY = this.y;

    // Aggiorna la posizione
    this.updateHorizontalPosition(deltaTime);
    this.updateVerticalPosition(deltaTime);

    // Aggiorna la hitbox in base alla nuova posizione
    this.hitbox.position = {
      x: this.x + this.width * 0.1,
      y: this.y + this.height * 0.2,
    };

    // Controlla le collisioni
    if (this.detectHorizontalCollision(boundaries)) {
      this.x = previousX;
    }
    if (this.detectVerticalCollision(boundaries)) {
      this.y = previousY;
    }

    // interaction with npc
    if (this.detectHorizontalCollision(staticNpgMap)) {
      this.x = previousX;
      this.velocity.x = 0;
      this.currentFrame = 0;
      this.emitInteractionEvent({
        type: "horizontal",
        direction: "right",
        method: "collision",
      });
    }
    if (this.detectVerticalCollision(staticNpgMap)) {
      this.y = previousY;
      this.velocity.y = 0;
      this.currentFrame = 0;
      this.emitInteractionEvent({
        type: "vertical",
        direction: "up",
        method: "collision",
      });
    }
    // check if player collide with a panel
    const panelCollisionObj = this.detectPanelCollision(panels);
    if (panelCollisionObj.collision) {
      // launch panel description event
      const panelActivation = new CustomEvent("panelActivation", {
        detail: {
          panel: panelCollisionObj.panel,
        },
      });
      window.dispatchEvent(panelActivation);
    }

    const buildingObj = this.checkBuildEntrance();
    // once the user enter a building a popup should be showned and user should be blocked
    if (buildingObj != null && buildingObj.page != "kayakGame") {
      // block user movements
      this.isMovementBlocked = true;

      // emit a custom event to trigger the dialog box
      const entranceEvent = new CustomEvent("buildingEntrance", {
        detail: {
          page: buildingObj.page,
          message: buildingObj.message,
          respawnPosition: buildingObj.respawnPosition,
        },
      });
      window.dispatchEvent(entranceEvent);
    } else if (buildingObj?.page === "kayakGame") {
      console.log("todo enter in kayak game");
    }
  }

  emitInteractionEvent = (interactionDetails: InteractionDetails) => {
    const npcInteraction = new CustomEvent("npcInteraction", {
      detail: interactionDetails,
    });
    window.dispatchEvent(npcInteraction);
  };

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    ctx.drawImage(
      this.image,
      this.currentSprite.x + 1,
      this.currentSprite.height * this.currentFrame + 1,
      this.currentSprite.width - 1,
      this.currentSprite.height - 2,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // Draw hitbox
    if (this.hitbox.show) {
      ctx.fillStyle = "rgba(0, 0, 255,0.2)";
      ctx.fillRect(
        this.hitbox.position.x,
        this.hitbox.position.y,
        this.hitbox.width,
        this.hitbox.height
      );
    }
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
  }
}
