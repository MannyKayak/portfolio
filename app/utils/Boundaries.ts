export const entry_zones = [
  {
    position: { x: 1152, y: 600 },
    width: 64,
    height: 10,
    page: "aboutMe",
    message:
      "You are entering in My house, here you'll find lots of infos about me, my passions and hobbies.",
    respawnPosition: { x: 1152, y: 600, direction: "down", frame: 0 },
  },
  {
    position: { x: 2112, y: 704 },
    width: 128,
    height: 10,
    page: "keepInTouch",
    message:
      "These are Pavia's Post Office, maybe you can send me a message...Let's keep in touch!",
    respawnPosition: { x: 2112, y: 744, direction: "down", frame: 0 },
  },
  {
    position: { x: 576, y: 448 },
    width: 64,
    height: 10,
    page: "education",
    message:
      "This has been my bachelor's Uni, here you'll find my Studies Curriculum and you can even download my CV...All boring stuff!",
    respawnPosition: { x: 576, y: 488, direction: "down", frame: 0 },
  },
  {
    position: { x: 1856, y: 1280 },
    width: 1,
    height: 128,
    page: "projects",
    message:
      "This is the Old Bridge of Pavia, this is the way if you want to know better what I did in practice!",
    respawnPosition: { x: 1816, y: 1280, direction: "left", frame: 2 },
  },
  {
    position: { x: 640, y: 1088 },
    width: 128,
    height: 10,
    page: "kayakGame",
    message:
      "Are you ready to jump on a kayak and have some fun? Enjoy this little game I built just for you!",
    respawnPosition: { x: 640, y: 986, direction: "up", frame: 1 },
  },
];

// DEBUG FUNCTION
export function draw_entry_zones(ctx: CanvasRenderingContext2D): void {
  entry_zones.forEach((zone) => {
    ctx.fillRect(zone.position.x, zone.position.y, zone.width, zone.height);
    ctx.fillStyle = "rgba(0, 0, 255, 1)";
  });
}
