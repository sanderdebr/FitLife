import React from "react";
import Button from "./Button";
import Input from "./Input";

function WorkoutScheme({ workout }) {
  if (!workout.exercises.length) {
    return <div>Add exercise first</div>;
  }

  const cellProps = "px-2 flex";

  return (
    <section className="max-w-lg w-full">
      {workout.exercises.map(({ exerciseName, sets }) => (
        <div>
          <h3>{exerciseName}</h3>
          <div className="bg-gray-100 flex items-center">
            <div className={cellProps}>Set</div>
            <div className={cellProps}>Kg</div>
            <div className={cellProps}>Reps</div>
            <div className={cellProps}></div>
          </div>
          {sets.length &&
            sets.map(({ id, weight, reps, isFinished }) => (
              <div
                className={`${
                  isFinished && "bg-green-50"
                } border border-0 border-b-1 border-gray-200 flex items-center`}
              >
                <div className={cellProps}>{id}</div>
                <div className={cellProps}>
                  <Input value={weight} />
                </div>
                <div className={cellProps}>
                  <Input value={reps} />
                </div>
                <div className={cellProps}>
                  <Button variant="primary" icon="check" />
                </div>
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}

export default WorkoutScheme;
