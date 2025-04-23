import kaplay, { KAPLAYCtx } from "kaplay";
export default function makeKaplayCtx(): KAPLAYCtx {
  return kaplay({
    global: false,
    pixelDensity: 2,
    touchToMouse: true,
    debug: false, // da togliere in prod
    debugKey: "f2",
    canvas: document.getElementById("game") as HTMLCanvasElement,
  });
}
