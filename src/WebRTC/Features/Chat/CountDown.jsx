import React, { useEffect, useRef, useState } from "react";

const CountDown = ({ duration }) => {
  const [timer, setTimer] = useState("00:00");
  const Ref = useRef(null);

  //getTimeRemaining to calculate remaining time
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { total, hours, minutes, seconds };
  };

  // StartTimer function
  const startTimer = (e) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  // clearTimer is used to clear the timer
  const clearTimer = (e) => {
    setTimer("00:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  // to provides the deadline of the timer means from where the timer start
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + duration);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime(duration));
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, [duration]);

  return (
    <div className="app">
      <h3>{timer}</h3>
    </div>
  );
};

export default CountDown;
