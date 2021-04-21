import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CalorieChart from "../components/CalorieChart";
import WorkoutChart from "../components/WorkoutChart";
import { CALORIES_PER_HOUR } from "../constants";
import useWorkoutDb from "../hooks/useWorkoutDb";

function Dashboard() {
  const { isFetchingWorkouts, workouts } = useWorkoutDb();

  const initialData = {
    today: 0,
    week: 0,
    month: 0,
  };

  const [calories, setCalories] = useState(initialData);

  useEffect(() => {
    setCalories(initialData);

    const today = new Date();
    const dayOfYear = format(today, "d");
    const weekNum = format(today, "w");
    const monthNum = format(today, "L");

    const calcCalories = () => {
      for (const { createdAt, secondsPassed } of workouts) {
        const formattedDate = new Date(createdAt.seconds * 1000);
        const day = format(formattedDate, "d");
        const week = format(formattedDate, "w");
        const month = format(formattedDate, "L");

        const newCalories = CALORIES_PER_HOUR * (secondsPassed / 3600);

        if (dayOfYear === day) {
          setCalories((calories) => ({
            ...calories,
            today: calories.today + newCalories,
          }));
        }
        if (weekNum === week) {
          setCalories((calories) => ({
            ...calories,
            week: calories.week + newCalories,
          }));
        }
        if (monthNum === month) {
          setCalories((calories) => ({
            ...calories,
            month: calories.month + newCalories,
          }));
        }
      }
    };

    if (!isFetchingWorkouts && workouts.length) {
      calcCalories();
    }
  }, [isFetchingWorkouts, workouts]);

  return (
    <div className="space-y-10 w-full">
      <div className="flex space-x-10 items-end">
        <h1 className="text-4xl">Dashboard</h1>
        <Link to="/workout">
          <Button value="New workout" variant="primary" type="text" />
        </Link>
      </div>
      <main className="lg:flex lg:space-x-10 space-y-5 lg:space-y-0">
        <section className="lg:w-72 bg-primary text-white rounded-xl">
          <div className="p-10 space-y-10">
            <h2 className="text-lg text-white">Workouts</h2>
            <div className="space-y-1">
              <h5 className="font-light text-sm text-white">TOTAL</h5>
              <h3 className="font-light text-6xl text-white">
                {isFetchingWorkouts ? 0 : workouts.length}
              </h3>
            </div>
          </div>
          <WorkoutChart />
        </section>
        <section className="flex-grow bg-white rounded-xl lg:flex">
          <div className="p-10 space-y-10">
            <h2 className="text-lg text-primary">Calories</h2>
            <div className="space-y-1">
              <h5 className="font-light text-sm text-primary">TODAY</h5>
              <h3 className="font-light text-6xl text-primary">
                {isFetchingWorkouts ? 0 : parseInt(calories.today)}
              </h3>
            </div>
            <div className="space-y-1">
              <h5 className="font-light text-sm text-primary">THIS WEEK</h5>
              <h3 className="font-light text-6xl text-primary">
                {isFetchingWorkouts ? 0 : parseInt(calories.week)}
              </h3>
            </div>
            <div className="space-y-1">
              <h5 className="font-light text-sm text-primary">THIS MONTH</h5>
              <h3 className="font-light text-6xl text-primary">
                {isFetchingWorkouts ? 0 : parseInt(calories.month)}
              </h3>
            </div>
          </div>
          <div className="flex-grow">
            <CalorieChart />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
