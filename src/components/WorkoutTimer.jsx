import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../contexts/workout/WorkoutContext";
import { database } from "../firebase";
import { padNum, persist } from "../helpers";
import useTimer from "../hooks/useTimer";
import Button from "./Button";

function WorkoutTimer({ toggleModal }) {
  const [message, setMessage] = useState("");

  const minutesRef = useRef();
  const secondsRef = useRef();

  const dispatch = useWorkoutDispatch();

  const { exercises, workoutInProgress } = useWorkoutState();

  const { user } = useAuth();

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
    stopTimer();
    persist("set", "timer", 0);

    dispatch({
      type: "DISCARD_WORKOUT",
    });
  };

  const newMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSave = async () => {
    newMessage("");

    try {
      await database.workouts.add({
        workout: JSON.stringify(exercises),
        userId: user.uid,
        createdAt: database.getCurrentTimestamp(),
      });

      newMessage("Saved succesfully");
      handleDiscard();
    } catch (err) {
      newMessage(err.message);
    }
  };

  const finishedSets = Object.values(exercises).filter(
    (exercise) =>
      Object.values(exercise.sets).filter((set) => set.isFinished === true)
        .length > 0
  );

  console.log(finishedSets);

  const showSave = finishedSets.length > 0;

  return (
    <div className="flex items-center space-x-4">
      {workoutInProgress ? (
        <ActiveWorkoutTimer
          showSave={showSave}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
          stopTimer={stopTimer}
          toggleModal={toggleModal}
          isPaused={isPaused}
          resumeTimer={resumeTimer}
          pauseTimer={pauseTimer}
        />
      ) : (
        <NotStartedWorkoutTimer handleStart={handleStart} />
      )}
      <div className="text-2xl">
        <span ref={minutesRef}>00</span>:<span ref={secondsRef}>00</span>
      </div>
      <div className="">{message && message}</div>
    </div>
  );
}

function ActiveWorkoutTimer({
  showSave,
  handleSave,
  handleDiscard,
  toggleModal,
  isPaused,
  resumeTimer,
  pauseTimer,
}) {
  return (
    <>
      <Button value="Discard workout" type="submit" action={handleDiscard} />
      {showSave && (
        <Button
          value="Save workout"
          type="submit"
          variant="primary"
          action={handleSave}
        />
      )}

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
