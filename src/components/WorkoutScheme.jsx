import React, { useEffect, useState } from "react";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../contexts/workout/WorkoutContext";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import Input from "./Input";

function WorkoutScheme() {
  const { exercises } = useWorkoutState();

  const dispatch = useWorkoutDispatch();

  // Add set
  const [addSet, setAddSet] = useState(null);

  useEffect(() => {
    if (addSet === null) return;

    dispatch({
      type: "ADD_SET",
      payload: {
        exerciseId: addSet,
        setId: uuidv4(),
      },
    });

    setAddSet(null);
  }, [dispatch, addSet]);

  const addSetHandler = (exerciseId) => setAddSet(exerciseId);

  // Remove set
  const [removeSet, setRemoveSet] = useState(null);

  useEffect(() => {
    if (removeSet === null) return;
    const { exerciseId, setId } = removeSet;

    dispatch({
      type: "REMOVE_SET",
      payload: {
        exerciseId,
        setId,
      },
    });

    setRemoveSet(null);
  }, [dispatch, removeSet]);

  const removeSetHandler = (exerciseId, setId) =>
    setRemoveSet({ exerciseId, setId });

  // Toggle finished
  const [toggleFinished, setToggleFinished] = useState(null);

  useEffect(() => {
    if (toggleFinished === null) return;
    const { exerciseId, setId } = toggleFinished;

    dispatch({
      type: "TOGGLE_FINISHED",
      payload: {
        exerciseId,
        setId,
      },
    });

    setToggleFinished(null);
  }, [dispatch, toggleFinished]);

  const toggleFinishedHandler = (exerciseId, setId) =>
    setToggleFinished({ exerciseId, setId });

  // Update weight
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (weight === null) return;
    const { exerciseId, setId, newWeight } = weight;

    dispatch({
      type: "UPDATE_WEIGHT",
      payload: {
        exerciseId,
        setId,
        newWeight,
      },
    });

    setWeight(null);
  }, [dispatch, weight]);

  const updateWeightHandler = (exerciseId, setId, newWeight) =>
    setWeight({ exerciseId, setId, newWeight });

  // Update reps
  const [reps, setReps] = useState(null);

  useEffect(() => {
    if (reps === null) return;
    const { exerciseId, setId, newReps } = reps;

    dispatch({
      type: "UPDATE_REPS",
      payload: {
        exerciseId,
        setId,
        newReps,
      },
    });

    setReps(null);
  }, [dispatch, reps]);

  const updateRepsHandler = (exerciseId, setId, newReps) =>
    setReps({ exerciseId, setId, newReps });

  // Remove exercise
  const [removeExercise, setRemoveExercise] = useState(null);

  useEffect(() => {
    if (removeExercise === null) return;

    dispatch({
      type: "REMOVE_EXERCISE",
      payload: removeExercise,
    });

    setRemoveExercise(null);
  }, [dispatch, removeExercise]);

  const removeExerciseHandler = (exerciseId) =>
    setRemoveExercise({ exerciseId });

  if (!Object.values(exercises).length) {
    return <div>Add some exercises</div>;
  }

  return Object.entries(exercises).map(
    ([exerciseId, { exerciseName, sets }]) => (
      <section key={exerciseId}>
        <div className="mb-6" key={exerciseId}>
          <div className="flex space-x-2 items-baseline">
            <h3 className="text-lg mb-4">{exerciseName}</h3>
            <Button
              icon="remove"
              action={() => removeExerciseHandler(exerciseId)}
            />
          </div>
          <div className="flex space-x-4 mb-2">
            <div className="w-12">Set</div>
            <div className="w-32">Kg</div>
            <div className="w-32">Reps</div>
            <div className="w-34"></div>
          </div>
          {Object.values(sets).length &&
            Object.entries(sets).map(
              ([setId, { weight, reps, isFinished }]) => (
                <div
                  className={`${
                    isFinished && "bg-green-50"
                  } flex space-x-4 py-2`}
                  key={setId}
                >
                  <div className="w-12 flex items-center justify-center">
                    nr
                  </div>
                  <div className="w-32">
                    <Input
                      center
                      value={weight}
                      handleChange={(e) =>
                        updateWeightHandler(exerciseId, setId, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      center
                      value={reps}
                      handleChange={(e) =>
                        updateRepsHandler(exerciseId, setId, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-34 flex items-center justify-center space-x-2">
                    <Button
                      variant="secondary"
                      icon="remove"
                      action={() => removeSetHandler(exerciseId, setId)}
                    />

                    <Button
                      icon="check"
                      variant={isFinished ? "primary" : "secondary"}
                      action={() => toggleFinishedHandler(exerciseId, setId)}
                    />
                  </div>
                </div>
              )
            )}
          <Button
            value="Add set"
            variant="primary"
            icon="plus"
            action={() => addSetHandler(exerciseId)}
          />
        </div>
      </section>
    )
  );
}

export default WorkoutScheme;
