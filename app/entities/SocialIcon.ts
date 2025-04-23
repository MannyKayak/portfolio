import { PALETTE } from "../context/constants";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
  store,
} from "../context/store";
import { opacityTrickleDown } from "../functions/utils";
import { IMakeIcon } from "../types";
import makeIcon from "./Icon";

export default function makeSocialIcon({
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  link,
  description,
}: IMakeIcon & { link: string; description: string }) {
  const [socialIcon, subtitleText] = makeIcon({
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
  });

  const linkSwitch = socialIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isSocialModalVisibleAtom, true);
    if (link) {
      store.set(selectedLinkAtom, link);
    }
    store.set(selectedLinkDescriptionAtom, description);
  });

  opacityTrickleDown({ parent, indirectChildren: [subtitleText, linkSwitch] });

  return socialIcon;
}
