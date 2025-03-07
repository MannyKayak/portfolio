import React from "react";

interface DialogBoxProps {
  message: string;
  handlePress: (choice: string) => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ message, handlePress }) => {
  return (
    <div className="absolute bg-white bottom-0 text-black text-justify justify-start border-black border-4 rounded-sm flex-col m-5">
      <div className="border-black rounded-sm border-4 m-1 p-5">
        {" "}
        {message}
        <div className="flex flex-row gap-10 justify-center mt-2">
          <button
            className="gameButtonStyle"
            onClick={() => handlePress("enter")}
          >
            Enter
          </button>
          <button
            className="gameButtonStyle"
            onClick={() => handlePress("exit")}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
