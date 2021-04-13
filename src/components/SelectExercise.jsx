import React, { useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { database } from "../firebase";
import useWorkoutDb from "../hooks/useWorkoutDb";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_SET } from "../constants";
import { useWorkoutDispatch } from "../contexts/workout/WorkoutContext";

function SelectExercise({ toggleModal }) {
  const [showCreateExercise, setShowCreateExercise] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  const dispatch = useWorkoutDispatch();

  const toggleShowCreateExercise = () => {
    setShowCreateExercise(!showCreateExercise);
  };

  const handleChangeName = (e) => {
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

  const addExercise = (exerciseName) => {
    const exercise = {
      exerciseName,
      sets: { [uuidv4()]: DEFAULT_SET },
    };

    dispatch({
      type: "ADD_EXERCISE",
      payload: { exerciseId: uuidv4(), exercise },
    });
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
                handleChangeName={handleChangeName}
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
  const { isFetchingExercises, exercises } = useWorkoutDb();

  if (isFetchingExercises) return <Icon type="loading" />;

  return (
    <div className="flex flex-col space-y-2">
      {exercises.length === 0
        ? "Add your first exercise"
        : exercises.map(({ exerciseName }) => (
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

function CreateExercise({ exerciseName, handleChangeName, error }) {
  return (
    <div className="space-y-4">
      <Input
        name="name"
        type="text"
        label="Name"
        placeholder="Exercise name.."
        value={exerciseName}
        handleChange={handleChangeName}
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

export default SelectExercise;
