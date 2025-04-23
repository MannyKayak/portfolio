import { KAPLAYCtx } from "kaplay";

export default function kaplayElementsLoader(k: KAPLAYCtx) {
  k.loadSprite("player", "./sprites/player.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
      "walk-down-stop": 0,
      "walk-down": {
        from: 0,
        to: 3,
        loop: true,
      },
      "walk-up-stop": 4,
      "walk-up": {
        from: 4,
        to: 7,
        loop: true,
      },
      "walk-left-stop": 8,
      "walk-left": {
        from: 8,
        to: 11,
        loop: true,
      },
      "walk-right-stop": 12,
      "walk-right": {
        from: 12,
        to: 15,
        loop: true,
      },
    },
  });
  // font
  k.loadFont("gameboy-font", "./fonts/EarlyGameBoy.ttf");
  // logos
  k.loadSprite("github-logo", "./logos/github-logo.png");
  k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
  k.loadSprite("x-logo", "./logos/x-logo.png");
  k.loadSprite("javascript-logo", "./logos/js-logo.png");
  k.loadSprite("typescript-logo", "./logos/ts-logo.png");
  k.loadSprite("react-logo", "./logos/react-logo.png");
  k.loadSprite("nextjs-logo", "./logos/nextjs-logo.png");
  k.loadSprite("html-logo", "./logos/html-logo.png");
  k.loadSprite("css-logo", "./logos/css-logo.png");
  k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
  k.loadSprite("python-logo", "./logos/python-logo.png");
  k.loadSprite("email-logo", "./logos/email-logo.png");
  k.loadSprite("instagram-logo", "./logos/instagram-logo.png");
  // project screenshots
  k.loadSprite("clean-steps", "./projects/cleansteps.png");
  k.loadSprite("arduino", "./projects/arduino.jpg");

  // shader
  k.loadShaderURL("backgroundPattern", null, "./shaders/pattern.frag");
}
