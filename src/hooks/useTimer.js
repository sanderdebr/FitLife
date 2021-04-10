import { useEffect, useRef, useState } from "react";
import { persist } from "../helpers";

function useTimer() {
  const countRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(
    persist("get", "timer") || 0
  );

  useEffect(() => {
    persist("set", "timer", secondsPassed);
  }, [secondsPassed]);

  const startTimer = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setSecondsPassed((seconds) => seconds + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSecondsPassed(0);
    clearInterval(countRef.current);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(countRef.current);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimer();
  };

  const resetTimer = () => {
    stopTimer();
    persist("set", "timer", 0);
  };

  return {
    secondsPassed,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
}

export default useTimer;
