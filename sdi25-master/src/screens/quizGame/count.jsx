import TextTransition, { presets } from "react-text-transition";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export default function GameCountView() {
  const navigate = useNavigate();
  
  const TEXTS = ["4", "3", "2", "1", "0"];
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 1500);
    return () => clearTimeout(intervalId);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      navigate("/hackathon/sdi/QuizGame");
    }, 6000);
  }, []);


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
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
