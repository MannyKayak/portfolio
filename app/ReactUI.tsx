import React from "react";
import CameraController from "./components/CameraController";
import SocialModal from "./components/modals/SocialModal";
import EmailModal from "./components/modals/EmailModal";
import ProjectModal from "./components/modals/ProjectModal";

export default function ReactUI() {
  return (
    <div>
      <h1 className="fixed text-color1 top-[5vh] left-[5vw] opacity-40 text-lg max-w-[40vw] select-none">
        Click/Tap somewhere to move
      </h1>
      <CameraController />
      <SocialModal />
      <EmailModal />
      <ProjectModal />
    </div>
  );
}
