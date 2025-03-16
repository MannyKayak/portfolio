"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { panelsData } from "@/app/data";
import Image from "next/image";

interface PanelBoxProps {
  panelName: string;
  handlePress: () => void;
}

const PanelBox: React.FC<PanelBoxProps> = ({ panelName, handlePress }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.2 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: handlePress,
    });
  };
  return (
    <div
      ref={boxRef}
      className="absolute bg-white bottom-0 top-0 left-0 right-0 text-black border-black border-4 rounded-sm flex flex-row m-5 p-5 max-h-screen overflow-hidden"
    >
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src={panelsData[panelName].image}
          width={400}
          height={400}
          className="w-full h-auto max-h-full object-contain"
          alt={panelsData[panelName].name}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-start overflow-y-auto p-4">
        <div className="text-xl font-bold">{panelsData[panelName].name}</div>
        <div className="mt-2">{panelsData[panelName].description}</div>
        <button
          className="mt-auto p-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handleClose}
        >
          close panel
        </button>
      </div>
    </div>
  );
};

export default PanelBox;
