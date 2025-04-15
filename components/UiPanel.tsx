"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";

interface UIPanelProps {
  position: {
    x: number;
    y: number;
  };
}

export default function UiPanel({ position }: UIPanelProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: "draggableUI",
  });

  const finalX = transform ? position.x + transform.x : position.x;
  const finalY = transform ? position.y + transform.y : position.y;

  return (
    <>
      {isVisible ? (
        <div
          ref={setNodeRef}
          {...attributes}
          style={{
            transform: `translate3d(${finalX}px, ${finalY}px, 0)`,
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: 20,
            opacity: 0.7,
            padding: "1rem",
            backgroundColor: "#64748b",
            color: "white",
            cursor: "move",
            borderRadius: 20,
          }}
        >
          <div className="flex gap-10 bg-black px-2 rounded-lg">
            <div {...listeners} className="text-2xl">
              Portfolio map
            </div>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-2xl z-40  font-bold hover:font-extrabold"
            >
              X
            </button>
          </div>
          <Link
            className="text-lg hover:font-extrabold hover:text-xl"
            href="/education"
          >
            Education
          </Link>
          <Link
            className="text-lg hover:font-extrabold hover:text-xl"
            href="/education"
          >
            Projects
          </Link>
          <Link
            className="text-lg hover:font-extrabold hover:text-xl"
            href="/education"
          >
            About Me
          </Link>
          <Link
            className="text-lg hover:font-extrabold hover:text-xl"
            href="/education"
          >
            Keep in touch!
          </Link>
        </div>
      ) : (
        <div
          ref={setNodeRef}
          {...attributes}
          style={{
            transform: `translate3d(${finalX}px, ${finalY}px, 0)`,
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            zIndex: 20,
            opacity: 0.7,
            padding: "1rem",
            backgroundColor: "#64748b",
            color: "white",
            cursor: "move",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div {...listeners}>Open Map</div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="font-bold hover:text-xl ml-4"
          >
            V
          </button>
        </div>
      )}
    </>
  );
}
