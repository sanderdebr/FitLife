import React from "react";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../contexts/workout/WorkoutContext";
import Button from "./Button";
import Input from "./Input";

function WorkoutScheme() {
  const { exercises } = useWorkoutState();

  const dispatch = useWorkoutDispatch();

  const addSet = (exerciseIndex) =>
    dispatch({
      type: "ADD_SET",
      payload: exerciseIndex,
    });

  const removeSet = (exerciseIndex, setIndex) =>
    dispatch({
      type: "REMOVE_SET",
      payload: { exerciseIndex, setIndex },
    });

  const toggleFinished = (exerciseIndex, setIndex) =>
    dispatch({
      type: "TOGGLE_FINISHED",
      payload: { exerciseIndex, setIndex },
    });

  console.log("exercises:", exercises);

  if (!exercises.length) {
    return <div>Add some exercises</div>;
  }

  return (
    <section>
      {exercises.map(({ exerciseName, sets }, exerciseIndex) => (
        <div className="mb-6" key={exerciseIndex}>
          <h3 className="text-lg mb-4">{exerciseName}</h3>
          <div className="flex space-x-4 mb-2">
            <div className="w-12">Set</div>
            <div className="w-24">Kg</div>
            <div className="w-24">Reps</div>
            <div className="w-34"></div>
          </div>
          {sets.length &&
            sets.map(({ weight, reps, isFinished }, setIndex) => (
              <div
                className={`${isFinished && "bg-green-50"} flex space-x-4 py-2`}
                key={setIndex}
              >
                <div className="w-12 flex items-center justify-center">
                  {setIndex + 1}
                </div>
                <div className="w-24">
                  <Input center value={weight} handleChange={null} />
                </div>
                <div className="w-24">
                  <Input center value={reps} handleChange={null} />
                </div>
                <div className="w-34 flex items-center justify-center space-x-2">
                  <Button
                    variant="secondary"
                    icon="remove"
                    action={() => removeSet(exerciseIndex, setIndex)}
                  />

                  <Button
                    icon="check"
                    variant={isFinished ? "primary" : "secondary"}
                    action={() => toggleFinished(exerciseIndex, setIndex)}
                  />
                </div>
              </div>
            ))}
          <Button
            value="Add set"
            variant="primary"
            icon="plus"
            action={() => addSet(exerciseIndex)}
          />
        </div>
      ))}
    </section>
  );
}

export default WorkoutScheme;
