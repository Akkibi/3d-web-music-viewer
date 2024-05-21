import AudioController from "./AudioController.js";
import Scene from "./../webgl/Scene.js";
const Song = ({ data }) => {
  console.log(data);
  const pickSong = () => {
    AudioController.updateSong(data.preview);
    Scene.plane.updateCover(data.album.cover_xl);
  };
  return (
    <div
      className="hover:text-white w-[50vh] text-gray-400 gap-5  px-2 h-14 bg-[rgba(0,0,0,0.5)] border-2 border-solid border-[rgba(0,0,0,0.5)] rounded-lg flex justify-between"
      onClick={pickSong}
    >
      <img
        src={data.album.cover_small}
        className=" h-10 w-10 self-center rounded-sm"
        alt=""
      />
      <h1 className="self-center overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
        {data.title}
      </h1>
      <div className="self-center h-10 w-10">
        <p className="top-1/2 relative left-1/2 -translate-x-1/2 -translate-y-1/2">
          ▶
        </p>
      </div>
    </div>
  );
};

export default Song;
