import { useRef, useEffect } from "react";
import Scene from "../webgl/Scene.js";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    Scene.setup(canvasRef.current);
  });
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full fixed -z-10 top-0 left-0"
    />
  );
};

export default Canvas;
