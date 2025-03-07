import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Projects = () => {
  return (
    <div>
      <Link
        href={"/"}
        className="fixed bottom-10 right-20 bg-slate-400 p-5 rounded-full shadow-md"
      >
        <FaHome className=" flex text-white text-lg size-10" />
      </Link>
      <div className="container mx-auto py-8 px-4">
        {/* Griglia asimmetrica: su schermi medi e superiori abbiamo 3 colonne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Progetto in evidenza: occupa 2/3 dello spazio */}
          <div className="md:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={"https://www.reddit.com/r/devvittest01/"}>
              <img
                src="/images/screenshot/cleansteps.png"
                alt="Progetto 1"
                className="w-full h-auto"
              />
            </Link>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Reddit hackathon</h2>
              <p className="text-gray-700">
                Clean Steps is a small game I developed for the Reddit
                Hackathon. It’s a unique guessing game where one player
                strategically places 💩 along a path in a park, and the other
                must find the correct route while avoiding these obstacles. I
                built the game using the Devvit SDK with TypeScript, and I
                created all the sprites and artwork in my own pixel art style.
              </p>
            </div>
          </div>

          {/* Colonna laterale con due progetti minori */}
          <div className="flex flex-col gap-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/screenshot/arduino.jpg"
                alt="Progetto 1"
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Dragster Tech</h3>
                <p className="text-gray-600">
                  This is a presonal project I'm still working on, I made an
                  Arduino sensor to measure movements of the boat, together with
                  this I made an instrument to measure power on gym exercises,
                  the aim is to find relationships between the two elements. To
                  develop I'm using Arduino IDE (C++) and Python to develope the
                  GUI to manage the data on PC.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/screenshot/avandra-splash.png"
                alt="Progetto 2"
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Avnadra</h3>
                <p className="text-gray-600">
                  Avandra was a small startup that I joined as full stack dev,
                  it was an AI agent able to manage user needs douring travels.
                  It was developed with React Native, JavaScript using Node and
                  Firebase as backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
