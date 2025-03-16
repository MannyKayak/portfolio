export const entry_zones = [
  {
    position: { x: 1152, y: 590 },
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
    respawnPosition: { x: 1728, y: 1280, direction: "left", frame: 2 },
  },
  {
    position: { x: 640, y: 1088 },
    width: 128,
    height: 10,
    page: "kayakGame",
    message:
      "Hey you! What are you doing here? You cannot enter, this is a private property!!!",
    respawnPosition: { x: 640, y: 986, direction: "up", frame: 1 },
  },
];

// DEBUG FUNCTION
export function draw_entry_zones(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = "rgba(0, 0, 255, 1)";
  entry_zones.forEach((zone) => {
    ctx.fillRect(zone.position.x, zone.position.y, zone.width, zone.height);
  });
}
export const panel_positions = [
  { name: "post_office", x: 2304, y: 768 },
  { name: "bridge", x: 1728, y: 1152 },
  { name: "statue", x: 1472, y: 960 },
  { name: "statue", x: 1536, y: 960 },
  { name: "university", x: 448, y: 512 },
  { name: "pavia", x: 1728, y: 192 },
  { name: "pavia", x: 1792, y: 192 },
];
