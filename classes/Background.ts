export default class Background {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
