import { PALETTE } from "../context/constants";
import { emailAtom, isEmailModalVisibleAtom, store } from "../context/store";
import { opacityTrickleDown } from "../functions/utils";
import { IMakeIcon } from "../types";
import makeIcon from "./Icon";

export default function makeEmailIcon({
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  email,
}: IMakeIcon & { email: string }) {
  const [emailIcon, subtitleText] = makeIcon({
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
  });

  const emailSwitch = emailIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  emailSwitch.onCollide("player", () => {
    store.set(isEmailModalVisibleAtom, true);
    store.set(emailAtom, email);
  });

  opacityTrickleDown({ parent, indirectChildren: [subtitleText, emailSwitch] });

  return emailIcon;
}
