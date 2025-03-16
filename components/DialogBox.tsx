"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface DialogBoxProps {
  message: string;
  handlePress: (choice: string) => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ message, handlePress }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      dialogRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.2 }
    );
  }, []);

  const handleClose = (choice: string) => {
    gsap.to(dialogRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.2,
      onComplete: () => {
        handlePress(choice);
      },
    });
  };
  return (
    <div
      ref={dialogRef}
      className="absolute bg-white bottom-0 text-black text-justify justify-start border-black border-4 rounded-sm flex-col m-5"
    >
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
            onClick={() => handleClose("exit")}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
