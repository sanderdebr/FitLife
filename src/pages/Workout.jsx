import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import SelectExercise from "../components/SelectExercise";
import WorkoutScheme from "../components/WorkoutScheme";
import { padNum } from "../helpers";
import useTimer from "../hooks/useTimer";
import { defaultSet } from "../constants";

function Workout() {
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

  const [showModal, setShowModal] = useState(false);
  const [workout, setWorkout] = useState({ exercises: [] });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addExercise = (exerciseName) => {
    setWorkout((workout) => ({
      ...workout,
      exercises: [...workout.exercises, { exerciseName, sets: [defaultSet] }],
    }));
  };

  return (
    <>
      {showModal && (
        <Modal>
          <SelectExercise toggleModal={toggleModal} addExercise={addExercise} />
        </Modal>
      )}
      <div className="space-y-10">
        <div className="flex space-x-10 items-end">
          <h1 className="text-4xl">Workout</h1>
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
        </div>
        <main className="flex flex-col">
          <section className="bg-white text-primary p-10 rounded-xl space-y-4">
            <WorkoutScheme workout={workout} />
          </section>
        </main>
      </div>
    </>
  );
}

export default Workout;
