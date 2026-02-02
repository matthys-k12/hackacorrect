import { useState, useEffect, useRef } from "react";
import "./AnswerTimer.scss";
import React from "react";

export default function AnswerTimer({ duration, reset }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (reset === true) {
      setCounter(0);
    }

    if (counter === duration) {
      setCounter(0);
    }
  }, [counter]);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 70
                ? "orange"
                : "red"
          }`,
        }}
        className="progress"
      ></div>
    </div>
  );
}
