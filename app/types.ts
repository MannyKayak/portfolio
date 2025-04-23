import { Game, GameObj, KAPLAYCtx, Vec2 } from "kaplay";

type ImageData = {
  name: string;
  width: number;
  height: number;
};

export interface IMakePlayer {
  k: KAPLAYCtx;
  posVec2: Vec2;
  speed: number;
}

export interface IPlayerAnimationManager {
  k: KAPLAYCtx;
  player: GameObj;
}

export interface IMakeIcon {
  k: KAPLAYCtx;
  parent: GameObj;
  posVec2: Vec2;
  imageData: ImageData;
  subtitle: string;
}

export interface IMakeAppear {
  k: KAPLAYCtx;
  gameObj: GameObj;
}

export interface IOpacityTrickleDown {
  parent: GameObj;
  indirectChildren: GameObj[];
}

export interface ISection {
  k: KAPLAYCtx;
  posVec2: Vec2;
  sectionName: string;
  onCollide?: (parent: GameObj) => void;
}

export interface IProjectCard {
  k: KAPLAYCtx;
  parent: GameObj;
  posVec2: Vec2;
  data: {
    title: "";
    links: [{ id: 0; name: ""; link: "" }];
  };
  thumbnail: string;
}

export interface IWorkExperienceCard {
  k: KAPLAYCtx;
  parent: GameObj;
  posVec2: Vec2;
  height: number;
  roleData: {
    title: string;
    description: string;
    company: {
      name: string;
      startDate: string;
      endDate: string;
    };
  };
}
