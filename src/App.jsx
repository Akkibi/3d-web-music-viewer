import Canvas from "./components/Canvas.jsx";
import Search from "./components/Search.jsx";
import Song from "./components/song.jsx";
import useCustomStore from "./customStore.js";
import Picker from "./components/Picker.jsx";

function App() {
  const songs = useCustomStore((state) => state.songs);
  return (
    <>
      <Picker />
      <div className="relative h-full overflow-y-scroll scrolling">
        <Search />
        <div className="px-5 flex flex-col gap-1  absolute top-3/4 py-14 left-1/2 -translate-x-1/2">
          {songs.map((song, index) => (
            <Song key={index} data={song} />
          ))}
        </div>
      </div>
      <div className="h-full fixed top-0 left-0 w-full -z-10 bg-[url('https://i.vimeocdn.com/video/1459170992-7c92d78bde517696b8dbaa28768a343a212633380adeb4652df5172405a20b9d-d_640x360.jpg')]"></div>
      <Canvas />
    </>
  );
}

export default App;
