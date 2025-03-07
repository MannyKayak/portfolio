export default class Boundary {
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string = "rgba(255, 0, 0, 0.5)";

  constructor(
    box: { x: number; y: number; width: number; height: number },
    color: string = "rgba(255, 0, 0, 0.5)"
  ) {
    this.position = { x: box.x, y: box.y };
    this.width = box.width;
    this.height = box.height;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
