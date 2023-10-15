import Canvas from "./components/Canvas.jsx";
import Search from "./components/Search.jsx";
import Song from "./components/song.jsx";
import useCustomStore from "./customStore.js";
import AudioController from "./components/AudioController.js";

function App() {
  const songs = useCustomStore((state) => state.songs);
  return (
    <>
      <div className="z-20 text-blue-500 text-2xl m-0 font-bold p-2 border-b border-solid absolute top-0 left-1/2 -translate-x-1/2 border-white">
        Music viewer
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="left-arrow"
          className="inline-block h-10 w-10 opacity-50 hover:opacity-100 cursor-pointer"
        >
          <path
            d="M15.41 16.09l-4.58-4.59 4.58-4.59-1.41-1.41-6 6 6 6z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="pause"
          className="inline-block h-10 w-10 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => AudioController.pause()}
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="right-arrow"
          className="inline-block h-10 w-10 opacity-50 hover:opacity-100 cursor-pointer"
        >
          <path
            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
            fill="white"
          />
        </svg>
      </div>
      <div className="relative h-full overflow-y-scroll scrolling">
        <div className="px-5 flex flex-col gap-1  absolute top-3/4 py-14 left-1/2 -translate-x-1/2">
          {songs.map((song, index) => (
            <Song key={index} data={song} />
          ))}
        </div>
        <Search />
      </div>
      <Canvas />
    </>
  );
}

export default App;
