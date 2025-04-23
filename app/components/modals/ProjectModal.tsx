import { useAtomValue, useAtom } from "jotai";
import {
  isProjectModalVisibleAtom,
  chosenProjectDataAtom,
} from "../../context/store";

export default function ProjectModal() {
  const projectData = useAtomValue(chosenProjectDataAtom);
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);

  return (
    isVisible && (
      <div className="flex fixed justify-center items-center top-0 z-10 w-[100%] h-[100%] overflow-auto backdrop:blur-sm">
        <div className="bg-color2 border-color1 border-solid mx-[35%] my-auto rounded-lg p-5 w-max-[500px] overflow-auto">
          <h1 className="text-color1">{projectData.title}</h1>
          <div className="flex flex-col">
            {projectData.links.map((linkData) => (
              <button
                key={linkData.id}
                className={
                  "font-inherit mt-[1vh] h-min-[5vh] h-max-[10vh] bg-color1 border-color1 rounded-lg text-color2 border-none active:bg-color4"
                }
                onClick={() => {
                  window.open(linkData.link, "_blank");
                }}
              >
                {linkData.name}
              </button>
            ))}
            <button
              className={
                "font-inherit mt-[1vh] h-min-[5vh] h-max-[10vh] bg-color1 border-color1 rounded-lg text-color2 border-none active:bg-color4"
              }
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
