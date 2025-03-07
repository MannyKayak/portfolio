type KeysState = {
  [key: string]: { pressed: boolean; isLast: boolean };
};

export default class InputManager {
  isPlayerBlocked: boolean;

  public keys: KeysState = {
    ArrowLeft: { pressed: false, isLast: false },
    ArrowRight: { pressed: false, isLast: false },
    ArrowUp: { pressed: false, isLast: false },
    ArrowDown: { pressed: false, isLast: false },
  };

  constructor(isPlayerBlocked: boolean = false) {
    this.isPlayerBlocked = isPlayerBlocked;
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener(
      "boxClosing",
      this.handleBoxClosing as EventListener
    );
  }

  private handleBoxClosing = (e: CustomEvent) => {
    this.isPlayerBlocked = false;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.isPlayerBlocked) return;
    switch (e.key) {
      case "ArrowLeft":
        this.keys.ArrowLeft.isLast = true;
        this.keys.ArrowRight.isLast = false;
        this.keys.ArrowUp.isLast = false;
        this.keys.ArrowDown.isLast = false;
        this.keys.ArrowLeft.pressed = true;
        break;
      case "ArrowRight":
        this.keys.ArrowLeft.isLast = false;
        this.keys.ArrowRight.isLast = true;
        this.keys.ArrowUp.isLast = false;
        this.keys.ArrowDown.isLast = false;
        this.keys.ArrowRight.pressed = true;
        break;
      case "ArrowUp":
        this.keys.ArrowLeft.isLast = false;
        this.keys.ArrowRight.isLast = false;
        this.keys.ArrowUp.isLast = true;
        this.keys.ArrowDown.isLast = false;
        this.keys.ArrowUp.pressed = true;
        break;
      case "ArrowDown":
        this.keys.ArrowLeft.isLast = false;
        this.keys.ArrowRight.isLast = false;
        this.keys.ArrowUp.isLast = false;
        this.keys.ArrowDown.isLast = true;
        this.keys.ArrowDown.pressed = true;
        break;
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        this.keys.ArrowLeft.pressed = false;
        break;
      case "ArrowRight":
        this.keys.ArrowRight.pressed = false;
        break;
      case "ArrowUp":
        this.keys.ArrowUp.pressed = false;
        break;
      case "ArrowDown":
        this.keys.ArrowDown.pressed = false;
        break;
    }
  };
}
