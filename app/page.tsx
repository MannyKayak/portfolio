"use client";

import Head from "next/head";
import React from "react";
import Flag from "react-world-flags";
import FormComponent from "../components/FormComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Manfredi Rizza | Portfolio</title>
        <meta
          name="description"
          content="Portfolio di Manfredi Rizza, ex atleta e sviluppatore web."
        />
        <link rel="icon" href="/u_spiddu_logo.ico" />
      </Head>

      <main className="text-center p-6 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Manfredi Rizza
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6">
          Athlete and web developer
        </h2>

        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Graduated in Materials Engineering from Politecnico di Milano and
          Tokyo Olympic silver medalist. After years of challenges in sports,
          I'm now driving the same mindset into development, turning my passion
          into a professional path!
        </p>

        <div className="mt-8 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Keep in touch
          </h3>
          <FormComponent />
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Download CV
          </h3>
          <div className="flex space-x-6 justify-center">
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
      </main>
    </div>
  );
}
