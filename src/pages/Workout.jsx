import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import { padNum } from "../helpers";
import useTimer from "../hooks/useTimer";

function Workout() {
  const minutesRef = useRef();
  const secondsRef = useRef();

  const {
    timer,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  } = useTimer(minutesRef, secondsRef);

  useEffect(() => {
    secondsRef.current.innerHTML = padNum(timer % 60);
    minutesRef.current.innerHTML = padNum(parseInt(timer / 60));
  }, [timer]);

  const loading = null;

  return (
    <div className="space-y-10">
      <div className="flex space-x-10 items-end">
        <h1 className="text-4xl">Workout</h1>
        <div className="flex items-center space-x-4">
          <Button
            value={isActive ? "Stop workout" : "Start empty workout"}
            type="submit"
            action={isActive ? stopTimer : startTimer}
          />
          {isActive ? (
            <Button
              type="submit"
              action={isPaused ? resumeTimer : pauseTimer}
              icon={isPaused ? "play" : "pause"}
              variant="frame"
            />
          ) : (
            <Button value="Pick a template" type="submit" action={null} />
          )}
          <div className="text-2xl">
            <span ref={minutesRef}>00</span>:<span ref={secondsRef}>00</span>
          </div>
        </div>
      </div>
      <main className="grid grid-cols-3 gap-10">
        <section className="bg-primary text-white p-10 rounded-xl">
          Workout: 87
        </section>
        <section className="col-span-2 bg-white p-10 rounded-xl">Right</section>
      </main>
    </div>
  );
}

export default Workout;
