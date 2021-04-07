import React from "react";
import Button from "./Button";
import Input from "./Input";

function WorkoutScheme({
  workout,
  handleWorkout,
  addSet,
  removeSet,
  throttle,
}) {
  if (!workout.exercises.length) {
    return <div>Add some exercises</div>;
  }

  console.log("workout: ", workout);

  return (
    <section>
      {workout.exercises.map(({ exerciseName, sets }, exerciseIndex) => (
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
                className={`${isFinished && "bg-green-50"} flex space-x-4 mb-4`}
                key={setIndex}
              >
                <div className="w-12 flex items-center justify-center">
                  {setIndex + 1}
                </div>
                <div className="w-24">
                  <Input
                    center
                    value={weight}
                    handleChange={(e) =>
                      handleWorkout(
                        exerciseIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-24">
                  <Input
                    center
                    value={reps}
                    handleChange={(e) =>
                      handleWorkout(
                        exerciseIndex,
                        setIndex,
                        "reps",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-34 flex items-center justify-center space-x-2">
                  <Button
                    variant="secondary"
                    icon="remove"
                    action={() => removeSet(exerciseIndex, setIndex)}
                  />
                  <Button
                    variant="primary"
                    icon="plus"
                    action={() => addSet(exerciseIndex)}
                  />
                  <Button icon="check" />
                </div>
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}

export default WorkoutScheme;
