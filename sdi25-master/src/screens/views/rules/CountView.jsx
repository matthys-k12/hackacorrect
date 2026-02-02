import TextTransition, { presets } from "react-text-transition";
import ReactAudioPlayer from "react-audio-player";
import audio from "../../../assets/song/song.mp3";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export default function CountView() {
  const navigate = useNavigate();

  const TEXTS = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 1500);
    return () => clearTimeout(intervalId);
  }, []);
  
  
  const TEXTS2 = ["À vos marques", "Prêt", "Partez..."];
  const [index2, setIndex2] = React.useState(0);
  useEffect(() => {
    const intervalId2 = setInterval(() => setIndex2((index) => index + 1), 6000);
    return () => clearTimeout(intervalId2);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      navigate("/hackathon/administration/Quiz");
    }, 14000);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <ReactAudioPlayer src={audio} autoPlay />
      <TextTransition className="mb-32" direction="down" springConfig={presets.wobbly}>
        <p className="text-2xl text-gray-700 font-bold">
          {TEXTS2[index2 % TEXTS2.length]}
        </p>
      </TextTransition>

      <div className="h-80 w-80 rounded-full bg-orange-100 flex justify-center pt-[70px]">
        <TextTransition direction="up" springConfig={presets.wobbly}>
          <p className="text-[8em] text-orange-700 font-bold">
            {TEXTS[index % TEXTS.length]}
          </p>
        </TextTransition>
      </div>
    </div>
  );
}
