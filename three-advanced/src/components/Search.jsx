import { useRef, useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import useCustomStore from "../customStore";
import AudioController from "./AudioController";
import { useDropzone } from "react-dropzone";

const Search = () => {
  const setSongs = useCustomStore((state) => state.setSongs);
  const [artist, setArtist] = useState("");
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      getSongs();
    }
  };

  const onDrop = (audio) => {
    const src = URL.createObjectURL(audio[0]);
    const audioObject = {
      title: audio[0].name,
      album: {
        cover_small: "",
      },
      preview: src,
    };

    setSongs([audioObject]);
    // setSelectedSong(audioObject);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });

  useEffect(() => {
    AudioController.setup();
  }, []);

  const getSongs = async () => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${artist}&output=jsonp`
    );

    response = await response.json();
    const data = response.data.slice(0, 10);
    AudioController.ctx.resume();

    console.log(data);
    setSongs(data);
    setArtist("");
  };
  console.log(isDragActive);
  return (
    <div {...getRootProps()} className="h-screen w-full absolute">
      <div className="absolute top-3/4 border-2 border-solid border-[rgba(0,0,0,0.5)] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[7.5vh] w-[30vh] rounded-full p-3 bg-[rgba(0,0,0,0.5)]  backdrop-blur-lg duration-500 z-50">
        <input
          type="text"
          onKeyDown={onKeyDown}
          placeholder="Never Gonna Give You Up"
          className="w-full h-full placeholder:text-slate-600 rounded-full text-black px-5 bg-[rgba(255,255,255,0.5)] focus:outline-none border-2 border-solid border-[rgba(0,0,0,0.5)]"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      {isDragActive && (
        <input
          {...getInputProps()}
          className="h-screen w-full fixed inset-0 top-0 left-0 right-0 bottom-0"
        />
      )}
    </div>
  );
};

export default Search;
