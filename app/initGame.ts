import { PALETTE } from "./context/constants";
import makeKaplayCtx from "./context/KaplapyCtx";
import { cameraZoomValueAtom, store } from "./context/store";
import kaplayElementsLoader from "./functions/kaplayElementsLoader";
import makePlayer from "./entities/makePlayer";
import makeSkillIcon from "./entities/SkillIcon";
import { makeAppear } from "./functions/utils";
import makeSection from "./entities/Section";
import makeProjectCard from "./entities/ProjectCard";
import makeWorkExperienceCard from "./entities/WorkExperienceCard";
import makeEmailIcon from "./entities/EmailIcon";
import makeSocialIcon from "./entities/SocialIcon";

export default async function initGame() {
  // fetch json data
  const generalData = await (await fetch("./configs/generalData.json")).json();
  const skillsData = await (await fetch("./configs/skillsData.json")).json();
  const socialsData = await (await fetch("./configs/socialsData.json")).json();
  const experiencesData = await (
    await fetch("./configs/experiencesData.json")
  ).json();
  const projectsData = await (
    await fetch("./configs/projectsData.json")
  ).json();

  // Inizializzo il KaplayCtx
  const k = makeKaplayCtx();

  // Carico tutte gli elementi grafici e font
  kaplayElementsLoader(k);

  if (k.width() < 1000) {
    k.setCamScale(k.vec2(0.2));
    store.set(cameraZoomValueAtom, { value: 0.2 });
  } else {
    k.setCamScale(k.vec2(0.4));
    store.set(cameraZoomValueAtom, { value: 0.4 });
  }

  k.onUpdate(() => {
    const cameraZoomValue = store.get(cameraZoomValueAtom);
    if (cameraZoomValue.value !== k.getCamScale().x)
      k.setCamScale(k.vec2(cameraZoomValue.value));
  });

  const background = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("backgroundPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color3),
      u_color2: k.Color.fromHex(PALETTE.color2),
      u_speed: k.vec2(1, -1),
      u_aspect: k.width() / k.height(),
      u_size: 5,
    })),
    k.pos(0, 0),
    k.fixed(),
  ]);

  background.onUpdate(() => {
    background.width = k.width();
    background.height = k.height();
    if (background.uniform)
      background.uniform.u_aspect = k.width() / k.height();
  });

  makeSection({
    k,
    posVec2: k.vec2(k.center().x, k.center().y - 400),
    sectionName: generalData.section1Name,
    onCollide: (parent) => {
      const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

      container.add([
        k.text(generalData.header.title, { font: "gameboy-font", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(65, 0),
        k.opacity(0),
      ]);

      container.add([
        k.text(generalData.header.subtitle, {
          font: "gameboy-font",
          size: 48,
        }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(385, 100),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

      for (const socialData of socialsData) {
        if (socialData.name === "Email") {
          makeEmailIcon({
            k,
            parent: socialContainer,
            posVec2: k.vec2(socialData.pos.x, socialData.pos.y),
            imageData: socialData.logoData,
            subtitle: socialData.name,
            email: socialData.address,
          });
          continue;
        }

        makeSocialIcon({
          k,
          parent: socialContainer,
          posVec2: k.vec2(socialData.pos.x, socialData.pos.y),
          imageData: socialData.logoData,
          subtitle: socialData.name,
          link: socialData.link,
          description: socialData.description,
        });
      }

      makeAppear({ k, gameObj: container });
      makeAppear({ k, gameObj: socialContainer });
    },
  });

  makeSection({
    k,
    posVec2: k.vec2(k.center().x - 400, k.center().y),
    sectionName: generalData.section2Name,
    onCollide: (parent) => {
      /* make the container independent of the section
       so that the skill icons appear on top of every section's children.
       so that when the skill icons are pushed around by the player
       they always remain on top */
      const container = k.add([
        k.opacity(0),
        k.pos(parent.pos.x - 300, parent.pos.y),
      ]);

      for (const skillData of skillsData) {
        makeSkillIcon({
          k,
          parent: container,
          posVec2: k.vec2(skillData.pos.x, skillData.pos.y),
          imageData: skillData.logoData,
          subtitle: skillData.name,
        });
      }

      makeAppear({ k, gameObj: container });
    },
  });
  makeSection({
    k,
    posVec2: k.vec2(k.center().x + 400, k.center().y),
    sectionName: generalData.section3Name,
    onCollide: (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      for (const experienceData of experiencesData) {
        makeWorkExperienceCard({
          k,
          parent: container,
          posVec2: k.vec2(experienceData.pos.x, experienceData.pos.y),
          height: experienceData.cardHeight,
          roleData: experienceData.roleData,
        });
      }

      makeAppear({ k, gameObj: container });
    },
  });

  makeSection({
    k,
    posVec2: k.vec2(k.center().x, k.center().y + 400),
    sectionName: generalData.section4Name,
    onCollide: (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0, 0)]);

      for (const project of projectsData) {
        makeProjectCard({
          k,
          parent: container,
          posVec2: k.vec2(project.pos.x, project.pos.y),
          data: project.data,
          thumbnail: project.thumbnail,
        });
      }

      makeAppear({ k, gameObj: container });
    },
  });

  makePlayer({ k, posVec2: k.vec2(k.center()), speed: 700 });
}
