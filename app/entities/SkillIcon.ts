import { Comp, GameObj, Vec2 } from "kaplay";
import makeIcon from "../entities/Icon";
import { opacityTrickleDown } from "../functions/utils";
import { IMakeIcon } from "../types";

export default function makeSkillIcon({
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
}: IMakeIcon) {
  const [icon, subtitleText] = makeIcon({
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
  });

  icon.use(
    k.area({ shape: new k.Rect(k.vec2(0), icon.width + 50, icon.height + 65) })
  );

  icon.use(k.body({ drag: 1 }));
  icon.use({ direction: k.vec2(0, 0) } as Comp);

  icon.onCollide("player", (player: GameObj) => {
    icon.applyImpulse(player.direction.scale(1000));
    icon.direction = player.direction as Vec2;
  });

  opacityTrickleDown({ parent, indirectChildren: [subtitleText] });

  return icon;
}
