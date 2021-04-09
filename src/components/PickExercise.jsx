import React, { useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { database } from "../firebase";
import useExercises from "../hooks/useExercises";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";

function PickExercise({ toggleModal, addExercise }) {
  const [showCreateExercise, setShowCreateExercise] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  const toggleShowCreateExercise = () => {
    setShowCreateExercise(!showCreateExercise);
  };

  const handleChange = (e) => {
    setExerciseName(e.target.value);
  };

  const saveExercise = async () => {
    if (!exerciseName) {
      return setError("Please fill in all fields");
    }

    setError("");

    try {
      await database.exercises.add({
        exerciseName,
        userId: user.uid,
        createdAt: database.getCurrentTimestamp(),
      });

      toggleShowCreateExercise();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="bg-white p-4">
        <div className="w-full">
          <div className="flex space-x-2 items-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon type="fitness" />
            </div>

            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              {showCreateExercise ? "Create exercise" : "Add exercise"}
            </h3>
          </div>
          <div className="mt-4">
            {showCreateExercise ? (
              <CreateExercise
                exerciseName={exerciseName}
                handleChange={handleChange}
                error={error}
              />
            ) : (
              <ExerciseList
                addExercise={addExercise}
                toggleModal={toggleModal}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 flex justify-between">
        {showCreateExercise ? (
          <CreateExerciseFooter
            toggleShowCreateExercise={toggleShowCreateExercise}
            saveExercise={saveExercise}
          />
        ) : (
          <SelectExerciseFooter
            toggleShowCreateExercise={toggleShowCreateExercise}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </>
  );
}

function ExerciseList({ addExercise, toggleModal }) {
  const { loading, exercises } = useExercises();

  if (loading) return <Icon type="loading" />;

  return (
    <div className="flex flex-col space-y-2">
      {exercises.map(({ exerciseName }) => (
        <Button
          key={exerciseName}
          value={exerciseName}
          variant="primary"
          action={() => {
            addExercise(exerciseName);
            toggleModal();
          }}
        />
      ))}
    </div>
  );
}

function SelectExerciseFooter({ toggleShowCreateExercise, toggleModal }) {
  return (
    <>
      <Button
        value="Create new exercise"
        variant="frame"
        action={toggleShowCreateExercise}
      />
      <div className="flex space-x-4">
        <Button value="Cancel" action={toggleModal} />
      </div>
    </>
  );
}

function CreateExercise({ exerciseName, handleChange, error }) {
  return (
    <div>
      <Input
        name=""
        type="text"
        label="Name"
        placeholder="Exercise name.."
        value={exerciseName}
        handleChange={handleChange}
      />
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}

function CreateExerciseFooter({ toggleShowCreateExercise, saveExercise }) {
  return (
    <div className="flex space-x-4">
      <Button value="Cancel" action={toggleShowCreateExercise} />
      <Button value="Save exercise" variant="primary" action={saveExercise} />
    </div>
  );
}

export default PickExercise;
