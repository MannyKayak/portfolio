"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { handleReturnHome } from "../utils/Functions";
import EducationCard from "@/components/EducationCard";
import { educationData } from "../data";

const EducationPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/assets/interno_uni.png"
        alt="University intern"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black text-center px-4">
        <div className="flex flex-row">
          {educationData.map((item, i) => (
            <EducationCard
              key={i + item.id}
              data={item}
              delay={`${i * 0.3}s`}
            />
          ))}
        </div>
        <div onClick={() => handleReturnHome("education")}>
          <Link href="/" className="underline text-xl hover:text-gray-300">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
