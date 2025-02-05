"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaX } from "react-icons/fa6";

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // show message in the top of the page
    setShowMessage(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>Manfredi Rizza | Portfolio</title>
        <meta
          name="description"
          content="Portfolio di Manfredi Rizza, ex atleta e sviluppatore web."
        />
        <link rel="icon" href="/u_spiddu_logo.ico" />
      </Head>

      {/* Messaggio iniziale */}
      {showMessage && (
        <div className="z-10 relative bg-orange-400/50 flex-row py-5">
          <div className="flex justify-center gap-6 items-center">
            The site is being worked on right now, so some parts might not be
            ready yet.
            <FaX
              className="flex size-3 hover:cursor-pointer active:text-slate-100"
              onClick={() => setShowMessage(false)}
            />
          </div>
        </div>
      )}

      {/* Immagine di sfondo con overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/sfondo.jpg"
          alt="sfondo"
          fill
          className="object-cover"
        />
        {/* Overlay scuro per migliorare la leggibilità */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenuto sovrapposto */}
      <div className="relative z-10 mt-9 ml-4 flex flex-col items-start justify-center h-full p-8 max-w-2xl">
        <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-lg">
          MANFREDI RIZZA
        </h1>
        <h2 className="text-2xl text-gray-200 mb-6 drop-shadow-lg">
          Athlete and Web Developer
        </h2>
        {/* <p className="text-lg text-gray-300 max-w-xl drop-shadow-lg">
          Graduated in Materials Engineering from Politecnico di Milano and
          Tokyo Olympic silver medalist. After years of challenges in sports,
          I'm now driving the same mindset into development, turning my passion
          into a professional path!
        </p> */}

        {/* Bottoni di navigazione */}
        <div className="mt-6 flex space-x-4">
          <Link
            href="/projects"
            className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            My Projects
          </Link>
          <Link
            href="/aboutMe"
            className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            About Me
          </Link>
          <Link
            href="/keepInTouch"
            className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Keep in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
