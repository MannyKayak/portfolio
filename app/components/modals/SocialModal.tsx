import { useAtom, useAtomValue } from "jotai";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../../context/store";

export default function SocialModal() {
  const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);

  const buttons = [
    {
      id: 0,
      name: "Yes",
      handler: () => {
        if (selectedLink) window.open(selectedLink, "_blank");
        setIsVisible(false);
      },
    },
    {
      id: 1,
      name: "No",
      handler: () => {
        setIsVisible(false);
      },
    },
  ];

  return (
    isVisible && (
      <div className="flex fixed justify-center items-center top-0 z-10 w-[100%] h-[100%] overflow-auto backdrop:blur-sm">
        <div className="bg-color2 border-color1 border-solid mx-[15%] my-auto rounded-lg p-5 w-max-[500px] overflow-auto">
          <h1 className="text-color1">Do you want to open this link?</h1>
          <span className="text-color1">{selectedLink}</span>
          <p className="text-color4 text-sm">{selectedLinkDescription}</p>
          <div className="flex flex-col">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={
                  "font-inherit mt-[1vh] h-min-[5vh] h-max-[10vh] bg-color1 border-color1 rounded-lg text-color2 border-none active:bg-color4"
                }
                onClick={button.handler}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
