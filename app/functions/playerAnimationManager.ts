import { IPlayerAnimationManager } from "../types";

export function playerAnimationManager({ k, player }: IPlayerAnimationManager) {
  if (
    player.direction.eq(k.vec2(0, 0)) &&
    !player.getCurAnim()?.name.includes("stop")
  ) {
    player.play(`${player.directioName}-stop`);
    return;
  }

  // walk-right
  if (
    player.direction.x > 0 &&
    player.direction.y > -0.7 &&
    player.direction.y < 0.7
  ) {
    player.directioName = "walk-right";
  }

  if (
    player.direction.x < 0 &&
    player.direction.y > -0.7 &&
    player.direction.y < 0.7
  ) {
    player.directioName = "walk-left";
  }
  if (player.direction.x < 0 && player.direction.y < -0.5) {
    player.directioName = "walk-up";
  }

  if (player.direction.x < 0 && player.direction.y > 0.5) {
    player.directioName = "walk-down";
  }
  if (player.getCurAnim()?.name !== player.directioName) {
    player.play(player.directioName);
  }
}
