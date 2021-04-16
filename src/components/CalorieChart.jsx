import { format, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import useWorkoutDb from "../hooks/useWorkoutDb";
import { CALORIES_PER_HOUR } from "../constants";

function CalorieChart() {
  const [data, setData] = useState([]);

  const { isFetchingWorkouts, workouts } = useWorkoutDb();

  useEffect(() => {
    let lastDays = [];

    const addEmptyDays = () => {
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const day = format(subDays(today, i), "E");
        lastDays.push(day);
        setData((data) => [...data, { day, calories: 0 }]);
      }
    };

    const addCaloriesPerDay = () => {
      for (const { createdAt, secondsPassed } of workouts) {
        const day = format(new Date(createdAt.seconds * 1000), "E");
        const index = lastDays.indexOf(day);
        if (index !== -1) {
          const calories = CALORIES_PER_HOUR * (secondsPassed / 3600);

          setData((data) => {
            data[index].calories = data[index].calories + parseInt(calories);
            return data;
          });
        }
      }
    };

    setData([]);
    addEmptyDays();

    if (!isFetchingWorkouts && workouts.length) {
      addCaloriesPerDay();
    }
  }, [isFetchingWorkouts, workouts]);

  return (
    <ResponsiveContainer width="99%" height={500}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFB7E4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFB7E4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#FFB7E4", fontSize: 10 }}
          interval={0}
          padding={{ left: 5, right: 5 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="calories"
          stroke="#de8cbf"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CalorieChart;
