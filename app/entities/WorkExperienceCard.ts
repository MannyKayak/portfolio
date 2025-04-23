import { PALETTE } from "../context/constants";
import { IWorkExperienceCard } from "../types";
import { opacityTrickleDown } from "../functions/utils";

export default function makeWorkExperienceCard({
  k,
  parent,
  posVec2,
  height,
  roleData,
}: IWorkExperienceCard) {
  const card = parent.add([
    k.rect(800, height, { radius: 8 }),
    k.area(),
    k.outline(4, k.Color.fromHex(PALETTE.color1)),
    k.pos(posVec2),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  const title = card.add([
    k.text(roleData.title, { font: "gameboy-font", size: 26 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 20),
    k.opacity(0),
  ]);

  const history = card.add([
    k.text("hello world!"),
    k.text(
      `${roleData.company.name}: ${roleData.company.startDate}-${roleData.company.endDate}`,
      {
        font: "gameboy-font",
        size: 15,
      }
    ),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 60),
    k.opacity(0),
  ]);

  const description = card.add([
    k.text(roleData.description, {
      font: "gameboy-font",
      size: 22,
      width: 750,
    }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 90),
    k.opacity(0),
  ]);

  opacityTrickleDown({
    parent,
    indirectChildren: [title, history, description],
  });

  return card;
}
