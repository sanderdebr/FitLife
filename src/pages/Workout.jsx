import React, { useState } from "react";
import Modal from "../components/Modal";
import PickExercise from "../components/PickExercise";
import WorkoutScheme from "../components/WorkoutScheme";
import WorkoutTimer from "../components/WorkoutTimer";
import { defaultSet } from "../constants";
import { useWorkoutDispatch } from "../contexts/workout/WorkoutContext";

function Workout() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useWorkoutDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addExercise = (exerciseName) => {
    const exercise = {
      exerciseName,
      sets: [defaultSet],
    };
    dispatch({
      type: "ADD_EXERCISE",
      payload: exercise,
    });
  };
  return (
    <>
      {showModal && (
        <Modal>
          <PickExercise toggleModal={toggleModal} addExercise={addExercise} />
        </Modal>
      )}
      <div className="space-y-10">
        <div className="flex space-x-10 items-end">
          <h1 className="text-4xl">Workout</h1>
          <WorkoutTimer toggleModal={toggleModal} />
        </div>
        <main className="flex flex-col">
          <section className="bg-white text-primary p-10 rounded-xl space-y-4">
            <WorkoutScheme />
          </section>
        </main>
      </div>
    </>
  );
}

export default Workout;
