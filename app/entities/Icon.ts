import { GameObj, Vec2 } from "kaplay";
import { PALETTE } from "../context/constants";
import { IMakeIcon } from "../types";

export default function makeIcon({
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
}: IMakeIcon): [GameObj, GameObj] {
  const icon = parent.add([
    k.sprite(imageData.name, {
      width: imageData.width,
      height: imageData.height,
    }),
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  const subtitleText = icon.add([
    k.text(subtitle, { font: "gameboy-font", size: 20 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, 100),
    k.opacity(0),
  ]);

  return [icon, subtitleText];
}
