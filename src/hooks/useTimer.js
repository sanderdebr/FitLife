import { useRef, useState } from "react";

function useTimer() {
  const countRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
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

  return {
    timer,
    isActive,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  };
}

export default useTimer;
