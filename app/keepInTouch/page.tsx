import React from "react";

import Flag from "react-world-flags";
import FormComponent from "../../components/FormComponent";
import { FaPaperPlane, FaHome } from "react-icons/fa";
import Link from "next/link";

const KeepInTouch = () => {
  return (
    <div className="flex flex-col pt-8 min-h-screen bg-slate-600 justify-center items-center">
      <h3 className="text-2xl font-semibold text-white mb-2">Keep in touch</h3>
      <Link
        href={"/"}
        className="absolute bottom-20 right-40 bg-slate-400 p-5 rounded-full shadow-md"
      >
        <FaHome className=" flex text-white text-lg size-10" />
      </Link>
      <div className="flex flex-col items-center ">
        <p className="text-white text-sm">
          Feel free to reach out if you need help with anything or have any
          questions.
        </p>
        <div className="flex items-center mt-4"></div>
      </div>

      {/* Sezione Form */}
      <div className="flex flex-row items-center align-middle justify-center gap-4">
        <h3 className=" flex text-xl font-semibold text-white mb-2">
          Contact Form
        </h3>
        <FaPaperPlane className=" flex text-white text-lg" />
      </div>

      <div className="w-1/3">
        <FormComponent />
      </div>

      {/* Sezione Download CV */}
      <div className="">
        <h3 className="text-xl font-semibold text-white mb-2">Download CV</h3>
        <div className="flex space-x-6">
          <a
            href="/cv/ManfrediRizza_CV_IT.pdf"
            download
            className="flex items-center justify-center w-16 h-16 bg-white text-black border-2 border-black rounded-full hover:bg-gray-200"
          >
            <Flag
              code="it"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </a>
          <a
            href="/cv/ManfrediRizza_CV_EN.pdf"
            download
            className="flex items-center justify-center w-16 h-16 bg-white text-black border-2 border-black rounded-full hover:bg-gray-200"
          >
            <Flag
              code="gb"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default KeepInTouch;
