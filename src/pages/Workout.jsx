import React, { useState } from "react";
import Modal from "../components/Modal";
import SelectExercise from "../components/SelectExercise";
import WorkoutScheme from "../components/WorkoutScheme";
import WorkoutTimer from "../components/WorkoutTimer";

function Workout() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal>
          <SelectExercise toggleModal={toggleModal} />
        </Modal>
      )}
      <div className="space-y-10">
        <div className="lg:flex lg:space-x-10 space-y-2 items-end">
          <h1 className="text-4xl">Workout</h1>
          <WorkoutTimer toggleModal={toggleModal} />
        </div>
        <main className="flex flex-col">
          <section className="bg-white text-primary lg:p-10 p-5 rounded-xl space-y-4">
            <WorkoutScheme />
          </section>
        </main>
      </div>
    </>
  );
}

export default Workout;
