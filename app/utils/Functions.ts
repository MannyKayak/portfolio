import { Boundary } from "@/classes";
import { collisions } from "./Boundaries";

export function rectangularCollision({
  rectangle1,
  rectangle2,
}: {
  rectangle1: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
  rectangle2: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
}): boolean {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

export function generateBoundariesMap(mapInfo: {
  cols: number;
  rows: number;
  tileWidth: number;
  tileHeight: number;
}) {
  const boundaries: Boundary[] = [];
  const collisionsMap: number[][] = [];
  // creation collision boundaries on the map
  for (let i = 0; i < collisions.length; i += mapInfo.cols) {
    collisionsMap.push(collisions.slice(i, i + mapInfo.cols));
  }

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        // nord
        case 785:
          const boundary13 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary13);
          break;
        // L nord-est
        case 786:
          const boundary14 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth,
            height: mapInfo.tileHeight / 2,
          });
          const boundary14_2 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary14);
          boundaries.push(boundary14_2);
          break;
        // pieno
        case 756:
        case 3320:
          const boundary = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth,
            height: mapInfo.tileHeight,
          });
          boundaries.push(boundary);
          break;
        // sud-ovest
        case 3321:
          const boundary2 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary2);
          break;
        // nord
        case 3323:
          const boundary4 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary4);
          break;
        case 3324:
          const boundary5 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          const boundary5_2 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          const boundary5_3 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary5);
          boundaries.push(boundary5_2);
          boundaries.push(boundary5_3);
          break;
        // sud
        case 3221228795:
        case 3221226257:
        case 1073742609:
          const boundary11 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary11);
          break;
        // ovest
        case 1610616059:
        case 1610613521:
          const boundary1 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight,
          });
          boundaries.push(boundary1);
          break;
        // est
        case 2684355345:
        case 2684357883:
          const boundary7 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight,
          });
          boundaries.push(boundary7);
          break;
        // L sud-est
        case 2684357884:
          const boundary8 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          const boundary8_2 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight,
          });
          boundaries.push(boundary8);
          boundaries.push(boundary8_2);
          break;
        // L sud-ovest
        case 3221228796:
          const boundary10 = new Boundary({
            x: j * mapInfo.tileWidth,
            y: i * mapInfo.tileHeight,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight,
          });
          const boundary10_2 = new Boundary({
            x: j * mapInfo.tileWidth + mapInfo.tileWidth / 2,
            y: i * mapInfo.tileHeight + mapInfo.tileHeight / 2,
            width: mapInfo.tileWidth / 2,
            height: mapInfo.tileHeight / 2,
          });
          boundaries.push(boundary10);
          boundaries.push(boundary10_2);
          break;
      }
    });
  });
  return boundaries;
}
