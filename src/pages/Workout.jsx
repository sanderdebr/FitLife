import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import SelectExercise from "../components/SelectExercise";
import Timer from "../components/Timer";
import WorkoutScheme from "../components/WorkoutScheme";
import { defaultSet } from "../constants";

function Workout() {
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

  const handleWorkout = (exerciseIndex, setIndex, field, newValue) => {
    setWorkout((workout) => {
      workout.exercises[exerciseIndex].sets[setIndex][field] = newValue;
      return workout;
    });
  };

  const removeSet = (exerciseIndex, setIndex) => {
    setWorkout((workout) => {
      workout.exercises[exerciseIndex].sets.splice(setIndex, 1);
      return workout;
    });
  };

  const addSet = (exerciseIndex) => {
    setWorkout((workout) => {
      const newWorkout = { ...workout };
      newWorkout.exercises[exerciseIndex].sets.push(defaultSet);
      return newWorkout;
    });
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
          <Timer toggleModal={toggleModal} />
        </div>
        <main className="flex flex-col">
          <section className="bg-white text-primary p-10 rounded-xl space-y-4">
            <WorkoutScheme
              workout={workout}
              handleWorkout={handleWorkout}
              addSet={addSet}
              removeSet={removeSet}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default Workout;
