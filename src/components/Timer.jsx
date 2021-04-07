import React, { useEffect, useRef } from "react";
import { padNum } from "../helpers";
import useTimer from "../hooks/useTimer";
import Button from "./Button";

function Timer({ toggleModal }) {
  const minutesRef = useRef();
  const secondsRef = useRef();

  const {
    timer,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  } = useTimer(minutesRef, secondsRef);

  useEffect(() => {
    secondsRef.current.innerHTML = padNum(timer % 60);
    minutesRef.current.innerHTML = padNum(parseInt(timer / 60));
  }, [timer]);

  return (
    <div className="flex items-center space-x-4">
      <Button
        value={isActive ? "Stop workout" : "Start empty workout"}
        type="submit"
        variant={isActive ? "frame" : "primary"}
        action={isActive ? stopTimer : startTimer}
      />
      {isActive && (
        <Button
          value="Add exercise"
          variant="primary"
          type="submit"
          action={toggleModal}
        />
      )}
      {isActive ? (
        <Button
          type="submit"
          action={isPaused ? resumeTimer : pauseTimer}
          icon={isPaused ? "play" : "pause"}
          variant="primary"
        />
      ) : (
        <Button
          value="Pick a template"
          variant="frame"
          type="submit"
          action={null}
        />
      )}
      <div className="text-2xl">
        <span ref={minutesRef}>00</span>:<span ref={secondsRef}>00</span>
      </div>
    </div>
  );
}

export default Timer;
