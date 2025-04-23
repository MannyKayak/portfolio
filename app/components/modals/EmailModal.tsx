import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isEmailModalVisibleAtom, emailAtom } from "../../context/store";

export default function EmailModal() {
  const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
  const email = useAtomValue(emailAtom);

  const [onCopyMessage, setOnCopyMessage] = useState("");

  const buttons = [
    {
      id: 0,
      name: "Yes",
      handler: () => {
        navigator.clipboard.writeText(email);
        setOnCopyMessage("Email copied to clipboard!");
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
          <h1 className="text-color1">Copy my email to your clipboard?</h1>
          <span className="text-color1">{email}</span>
          <p className="text-color4 text-sm">{onCopyMessage}</p>
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
