import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import WorkoutChart from "../components/WorkoutChart";
import useWorkoutDb from "../hooks/useWorkoutDb";

function Dashboard() {
  const { isFetchingWorkouts, workouts } = useWorkoutDb();

  return (
    <div className="space-y-10">
      <div className="flex space-x-10 items-end">
        <h1 className="text-4xl">Dashboard</h1>
        <Link to="/workout">
          <Button value="New workout" variant="primary" type="text" />
        </Link>
      </div>
      <main className="flex space-x-10">
        <section className="w-72 bg-primary text-white rounded-xl">
          <div className="p-10">
            <h2 className="text-sm font-light text-white">Workouts</h2>
            <h3 className="mt-8 font-light text-6xl text-white">
              {isFetchingWorkouts ? 0 : workouts.length}
            </h3>
          </div>
          <WorkoutChart />
        </section>
        <section className="flex-grow bg-white p-10 rounded-xl">
          <h2 className="text-xl mb-6">Calories burned</h2>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
