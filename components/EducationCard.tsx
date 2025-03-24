"use client";
import React, { useState } from "react";
import Image from "next/image";

const EducationCard: React.FC<EducationCardProps> = ({
  data,
  delay = "0s",
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="m-4">
      <div
        className=" relative w-[150px] h-[210px] cursor-pointer transition-transform hover:scale-105 animate-bounce-slow"
        style={{ animationDelay: delay }}
        onClick={() => setShowPopup(true)}
      >
        <Image
          src={data.image}
          alt={data.title}
          fill
          className=" object-contain rounded-md"
        />

        {/* Contenitore del testo nella parte bassa */}
        <div className="absolute z-10 bottom-[20px] top-[130px] left-[60px] right-[20px] -translate-x-1/4 flex items-center justify-center px-2">
          <p className="text-black text-card-size font-light text-center leading-tight">
            {data.title}
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-3 shadow-lg relative max-w-[500px] max-h-[500px] overflow-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <div className="w-full h-auto flex justify-center mb-1">
              <Image
                src={data.image}
                alt={data.title}
                width={120} // Ridotto
                height={160} // Ridotto proporzionalmente
                className="rounded-lg object-contain"
              />
            </div>
            <h2 className="text-lg font-bold mb-1 text-center">{data.title}</h2>
            <p className="text-gray-700 text-sm text-center">{data.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCard;
