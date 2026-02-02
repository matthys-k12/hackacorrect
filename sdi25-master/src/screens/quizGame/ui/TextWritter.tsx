import React from "react";
import { TypewriterEffectSmooth } from "../../../components/ui/acertinity/TextAnimation.tsx";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Bienvenue",
    },
    {
      text: "au",
    },
    {
      text: "quiz",
    },
    {
      text: "de",
    },
    {
      text: "la",
    },
    {
      text: "Jetic.",
      className: "text-[#F94C10] dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      </div>
    </div>
  );
}
