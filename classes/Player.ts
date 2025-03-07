import { rectangularCollision } from "@/app/utils/Functions";
import { Boundary } from "@/classes";
import { entry_zones } from "@/app/utils/Boundaries";

export default class Player {
  static X_VELOCITY: number = 250;
  static Y_VELOCITY: number = 250;

  x: number;
  y: number;
  width: number = 64;
  height: number = 64;
  velocity: { x: number; y: number } = { x: 0, y: 0 };
  image: HTMLImageElement = new Image();
  center: { x: number; y: number };
  loaded: boolean = false;
  currentFrame: number = 0;
  elapsedTime: number = 0;
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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.isMovementBlocked = false;
    this.walkDirection = "down";

    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = "/images/assets/player_walk_scaled.png";

    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };

    this.currentSprite = this.sprites.walkDown;
    this.hitbox = {
      position: { x: this.x, y: this.y },
      width: this.width * 0.8,
      height: this.height * 0.9,
      show: true,
    };

    this.listenToGameEvents();
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

  listenToGameEvents() {
    const handleBoxClosed = (e: CustomEvent) => {
      this.isMovementBlocked = false;
      switch (this.walkDirection) {
        case "left":
          // player shift to the right at same y
          this.x = this.x + this.width / 2;
          this.currentSprite = this.sprites.walkRight;
          this.currentSprite.frameCount = 3;
          break;
        case "right":
          this.x = this.x - this.width / 2;
          this.currentSprite = this.sprites.walkLeft;
          this.currentSprite.frameCount = 2;
          break;
        case "up":
          this.y = this.y + this.height / 2;
          // spawn it facing the opposite direction
          this.currentSprite = this.sprites.walkDown;
          this.currentSprite.frameCount = 0;
          break;
        case "down":
          this.y = this.y - this.height / 2;
          this.currentSprite = this.sprites.walkUp;
          this.currentSprite.frameCount = 1;
          break;
      }
    };

    const handleReturnHome = (e: CustomEvent) => {
      this.isMovementBlocked = false;
      this.x = e.detail.exitPosition.x;
      this.y = e.detail.exitPosition.y;
    };

    window.addEventListener("boxClosing", handleBoxClosed as EventListener);
    window.addEventListener("returnHome", handleReturnHome as EventListener);
  }

  update(deltaTime: number, boundaries: Boundary[]) {
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

    const buildingObj = this.checkBuildEntrance();
    // once the user enter a building a popup should be showned and user should be blocked
    if (buildingObj != null) {
      // block user movements
      this.isMovementBlocked = true;

      // emit a custom event to trigger the dialog box
      const entranceEvent = new CustomEvent("buildingEntrance", {
        detail: {
          page: buildingObj.page,
          message: buildingObj.message,
          exitPosition: buildingObj.position,
        },
      });
      window.dispatchEvent(entranceEvent);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    ctx.drawImage(
      this.image,
      this.currentSprite.x,
      this.currentSprite.height * this.currentFrame + 1,
      this.currentSprite.width,
      this.currentSprite.height,
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
}
