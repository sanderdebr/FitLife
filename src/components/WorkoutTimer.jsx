import React, { useEffect, useRef } from "react";
import { useWorkoutState } from "../contexts/workout/WorkoutContext";
import { padNum } from "../helpers";
import useTimer from "../hooks/useTimer";
import Button from "./Button";

function WorkoutTimer({ toggleModal }) {
  const minutesRef = useRef();
  const secondsRef = useRef();

  const { exercises } = useWorkoutState();

  const {
    secondsPassed,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  } = useTimer();

  useEffect(() => {
    if (Object.values(exercises).length > 0) {
      startTimer();
    }
  }, []);

  useEffect(() => {
    secondsRef.current.innerHTML = padNum(secondsPassed % 60);
    minutesRef.current.innerHTML = padNum(parseInt(secondsPassed / 60));
  }, [secondsPassed]);

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

export default WorkoutTimer;
