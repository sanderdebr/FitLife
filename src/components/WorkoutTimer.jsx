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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      await database.workouts.add({
        workout: JSON.stringify(exercises),
        secondsPassed,
        userId: user.uid,
        createdAt: database.getCurrentTimestamp(),
      });

      newMessage("Saved succesfully");
      handleDiscard();
    } catch (err) {
      newMessage(err.message);
    }

    setLoading(false);
  };

  const finishedSets = Object.values(exercises).filter(
    (exercise) =>
      Object.values(exercise.sets).filter((set) => set.isFinished === true)
        .length > 0
  );

  const showSave = finishedSets.length > 0;

  return (
    <div className="flex flex-wrap items-center space-x-4">
      {workoutInProgress ? (
        <ActiveWorkoutTimer
          showSave={showSave}
          handleSave={handleSave}
          handleDiscard={handleDiscard}
          loading={loading}
          stopTimer={stopTimer}
          toggleModal={toggleModal}
          isPaused={isPaused}
          resumeTimer={resumeTimer}
          pauseTimer={pauseTimer}
        />
      ) : (
        <Button
          value="Start empty workout"
          type="submit"
          variant="primary"
          action={handleStart}
        />
      )}
      <div className="text-2xl">
        <span ref={minutesRef}>00</span>:<span ref={secondsRef}>00</span>
      </div>
      <div className="text-primary font-semibold">{message && message}</div>
      {workoutInProgress && !showSave ? (
        <div className="text-primary text-sm pt-4 lg:pt-0">
          Complete at least one set to save this workout
        </div>
      ) : null}
    </div>
  );
}

function ActiveWorkoutTimer({
  showSave,
  handleSave,
  handleDiscard,
  loading,
  toggleModal,
  isPaused,
  resumeTimer,
  pauseTimer,
}) {
  return (
    <>
      <Button
        value="Discard workout"
        variant="red"
        type="submit"
        action={handleDiscard}
      />
      {showSave && (
        <Button
          value="Save workout"
          type="submit"
          variant="primary"
          action={handleSave}
          loading={loading}
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

export default WorkoutTimer;
