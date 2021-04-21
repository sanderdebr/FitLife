import { format, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import useWorkoutDb from "../hooks/useWorkoutDb";

function WorkoutChart() {
  const [data, setData] = useState([]);

  const { isFetchingWorkouts, workouts } = useWorkoutDb();

  useEffect(() => {
    let lastMonths = [];

    const addEmptyMonths = () => {
      const today = new Date();

      for (let i = 2; i >= 0; i--) {
        const month = format(subMonths(today, i), "LLL");
        lastMonths.push(month);
        setData((data) => [...data, { month, amount: 0 }]);
      }
    };

    const addWorkoutsPerMonth = () => {
      for (const { createdAt } of workouts) {
        const month = format(new Date(createdAt.seconds * 1000), "LLL");
        const index = lastMonths.indexOf(month);
        if (index !== -1) {
          setData((data) => {
            data[index].amount++;
            return data;
          });
        }
      }
    };

    setData([]);
    addEmptyMonths();

    if (!isFetchingWorkouts && workouts.length) {
      addWorkoutsPerMonth();
    }
  }, [isFetchingWorkouts, workouts]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFB7E4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFB7E4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#FFB7E4", fontSize: 10 }}
          interval={0}
          padding={{ left: 5, right: 5 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#de8cbf"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default WorkoutChart;
