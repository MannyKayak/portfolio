import { useAtom } from "jotai";
import { cameraZoomValueAtom } from "../context/store";
import { ZOOM_MAX_BOUND, ZOOM_MIN_BOUND } from "../context/constants";

export default function CameraController() {
  const [camZoomValue, setCamZoomValue] = useAtom(cameraZoomValueAtom);

  return (
    <div className="flex fixed top-[5vh] right-[5vw] z-10 gap-[1vh]">
      <button
        className="bg-color1 text-color2 border-color1 border-solid rounded-md text-sm w-[12vw] opacity-40 items-center justify-center active:opacity-100 pt-2"
        onClick={() => {
          const newZoomValue = camZoomValue.value + 0.2;

          if (
            newZoomValue <= ZOOM_MAX_BOUND &&
            newZoomValue >= ZOOM_MIN_BOUND
          ) {
            setCamZoomValue({ value: newZoomValue });
          }
        }}
      >
        +
      </button>
      <button
        className="bg-color1 text-color2 border-color1 border-solid rounded-md text-lg w-[12vw] opacity-40 items-center justify-center active:opacity-100"
        onClick={() => {
          const newZoomValue = camZoomValue.value - 0.2;
          if (
            newZoomValue <= ZOOM_MAX_BOUND &&
            newZoomValue >= ZOOM_MIN_BOUND
          ) {
            setCamZoomValue({ value: newZoomValue });
          }
        }}
      >
        -
      </button>
    </div>
  );
}
