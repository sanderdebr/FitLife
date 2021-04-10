import React, { useEffect, useRef } from "react";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../contexts/workout/WorkoutContext";
import { padNum, persist } from "../helpers";
import useTimer from "../hooks/useTimer";
import Button from "./Button";

function WorkoutTimer({ toggleModal }) {
  const minutesRef = useRef();
  const secondsRef = useRef();

  const dispatch = useWorkoutDispatch();

  const { workoutInProgress } = useWorkoutState();

  const {
    secondsPassed,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  } = useTimer();

  useEffect(() => {
    if (persist("get", "timer") > 0) {
      resumeTimer();
    }
  }, []);

  useEffect(() => {
    secondsRef.current.innerHTML = padNum(secondsPassed % 60);
    minutesRef.current.innerHTML = padNum(parseInt(secondsPassed / 60));
  }, [secondsPassed]);

  const handleStart = () => {
    startTimer();
    dispatch({
      type: "START_WORKOUT",
    });
  };

  const handleDiscard = () => {
    resetTimer();
    dispatch({
      type: "DISCARD_WORKOUT",
    });
  };

  return (
    <div className="flex items-center space-x-4">
      {workoutInProgress ? (
        isActive ? (
          <ActiveWorkoutTimer
            stopTimer={stopTimer}
            toggleModal={toggleModal}
            isPaused={isPaused}
            resumeTimer={resumeTimer}
            pauseTimer={pauseTimer}
          />
        ) : (
          <EndWorkoutTimer handleDiscard={handleDiscard} />
        )
      ) : (
        <NotStartedWorkoutTimer handleStart={handleStart} />
      )}
      <div className="text-2xl">
        <span ref={minutesRef}>00</span>:<span ref={secondsRef}>00</span>
      </div>
    </div>
  );
}

function ActiveWorkoutTimer({
  stopTimer,
  toggleModal,
  isPaused,
  resumeTimer,
  pauseTimer,
}) {
  return (
    <>
      <Button
        value="Stop workout"
        type="submit"
        variant="frame"
        action={stopTimer}
      />
      <Button
        value="Add exercise"
        variant="primary"
        type="submit"
        action={toggleModal}
      />
      <Button
        type="submit"
        action={isPaused ? resumeTimer : pauseTimer}
        icon={isPaused ? "play" : "pause"}
        variant="primary"
      />
    </>
  );
}

function EndWorkoutTimer({ handleDiscard }) {
  return (
    <>
      <Button
        value="Save workout"
        type="submit"
        variant="primary"
        action={null}
      />
      <Button
        value="Discard workout"
        type="submit"
        variant="primary"
        action={handleDiscard}
      />
    </>
  );
}

function NotStartedWorkoutTimer({ handleStart }) {
  return (
    <>
      <Button
        value="Start empty workout"
        type="submit"
        variant="primary"
        action={handleStart}
      />
      <Button
        value="Pick a template"
        variant="frame"
        type="submit"
        action={null}
      />
    </>
  );
}

export default WorkoutTimer;
