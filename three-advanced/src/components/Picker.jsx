import Scene from "../webgl/Scene";
import AudioController from "./AudioController.js";
import { useState } from "react";

const Picker = () => {
  const [selected, setSelected] = useState(0);
  const pickvisualizer = (i) => {
    Scene.pickvisualizer(i);
  };

  return (
    <div className="z-20 text-[#ffffff] text-2xl m-0 font-bold p-2 border-b border-solid absolute top-0 left-1/2 -translate-x-1/2 border-white">
      <div
        className="inline-block"
        onClick={() => {
          pickvisualizer(0), setSelected(0);
        }}
      >
        <p className="text-2xl text-white hover:opacity-100 opacity-50 font-thin">
          Cube
        </p>
      </div>
      {" / "}
      <div
        className="inline-block"
        onClick={() => {
          pickvisualizer(1), setSelected(1);
        }}
      >
        <p className="text-2xl text-white hover:opacity-100 opacity-50 font-thin">
          Line
        </p>
      </div>
      {" / "}
      <div
        className="inline-block"
        onClick={() => {
          pickvisualizer(2), setSelected(2);
        }}
      >
        <p className="text-2xl text-white hover:opacity-100 opacity-50 font-thin">
          Logo
        </p>
      </div>
      {" / "}
      <div
        className="inline-block"
        onClick={() => {
          pickvisualizer(3), setSelected(3);
        }}
      >
        <p className="text-2xl text-white hover:opacity-100 opacity-50 font-thin">
          Board
        </p>
      </div>
      {" / "}
      <div
        className="inline-block"
        onClick={() => {
          pickvisualizer(4), setSelected(4);
        }}
      >
        <p className="text-2xl text-white hover:opacity-100 opacity-50 font-thin">
          Cover
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="pause"
        className="inline-block h-10 w-10 mx-10 opacity-50 hover:opacity-100 cursor-pointer"
        onClick={() => AudioController.pause()}
      >
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
      </svg>
    </div>
  );
};

export default Picker;
