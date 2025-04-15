import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function () {
  const { isOver, setNodeRef } = useDroppable({
    id: "dropDiv",
  });

  return (
    <div
      ref={setNodeRef}
      className="absolute top-0 left-0 bottom-0 right-0 bg-transparent"
    ></div>
  );
}
