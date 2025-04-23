import { GameObj } from "kaplay";
import { IMakePlayer } from "../types";
import { playerAnimationManager } from "../functions/playerAnimationManager";
import {
  isEmailModalVisibleAtom,
  isProjectModalVisibleAtom,
  isSocialModalVisibleAtom,
  store,
} from "../context/store";

export default function makePlayer({
  k,
  posVec2,
  speed,
}: IMakePlayer): GameObj {
  const player = k.add([
    k.sprite("player", { anim: "walk-down-stop" }),
    k.scale(6),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
      directioName: "walk-down",
    },
  ]);

  // variabile di controllo del mouse
  let isMouseDown: boolean = false;
  // riferimento al canvas
  const game = document.getElementById("game");
  if (game) {
    game.addEventListener("focusout", () => {
      isMouseDown = false;
    });

    game.addEventListener("mousedown", () => {
      isMouseDown = true;
    });
    game.addEventListener("touchstart", () => {
      isMouseDown = true;
    });
    game.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    game.addEventListener("touchend", () => {
      isMouseDown = false;
    });
  }

  player.onUpdate(() => {
    // camera follow the player position
    if (!k.getCamPos().eq(player.pos)) {
      k.tween(
        k.getCamPos(),
        player.pos,
        0.2,
        (newPos) => k.setCamPos(newPos),
        k.easings.linear
      );
    }

    if (
      store.get(isSocialModalVisibleAtom) ||
      store.get(isEmailModalVisibleAtom) ||
      store.get(isProjectModalVisibleAtom)
    )
      return;

    // manage player movements
    const mouseWorldPosition = k.toWorld(k.mousePos());
    player.direction = k.vec2(0, 0);

    if (isMouseDown) {
      player.direction = mouseWorldPosition.sub(player.pos).unit();
    }

    // TODO: create oblique animations
    // manger delle animazioni
    playerAnimationManager({ k, player });

    player.move(player.direction.scale(speed));
  });

  return player;
}
