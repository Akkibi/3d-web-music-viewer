import { useState } from "react";
import { Canvas } from "./components/Canvas";

function App() {
  return (
    <>
      <div className="p-[1vh] m-[1vh] rounded-lg bg-black h-full w-full">
        <h1 className="text-red-500">HELLO WORLD</h1>
        <Canvas />
      </div>
    </>
  );
}

export default App;
