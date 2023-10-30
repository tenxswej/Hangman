import React, { useState, useEffect } from "react";
import { useGame } from "../context/context";

interface IProp{
  setIsWin : React.Dispatch<React.SetStateAction<boolean | "lost" >> 
}

const Countdown = ({setIsWin} : IProp) => {
  const initialTime = "00:59";
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const {state : {status},dispatch} = useGame()


  useEffect(() => {
    if(status === "new" || status === "finish"){
      setTime(initialTime)
      setIsRunning(false)
    }

  },[status])

  useEffect(() => {
    let timer: number;
    if (status === "start") {
      timer = setInterval(() => {
        const [minutes, seconds] = time.split(":").map(Number);

        if (minutes === 0 && seconds === 0) {
          setIsRunning(false);
          clearInterval(timer);
        } else {
          const newSeconds = seconds === 0 ? 59 : seconds - 1;
          const newMinutes = seconds === 0 ? minutes - 1 : minutes;

          const formattedMinutes = newMinutes.toString().padStart(2, "0");
          const formattedSeconds = newSeconds.toString().padStart(2, "0");

          setTime(`${formattedMinutes}:${formattedSeconds}`);
        }
      }, 1000);
    }else if(status === null){
    setIsRunning(false);
    setTime(initialTime);
    }

    if(time === "00:30") {
      setIsWin("lost")
      setTimeout(() => {
        dispatch({type : "reset"})
        setIsWin(null)

      },3000)
      // setIsWin(null)
    }

    return () => clearInterval(timer);
  }, [time, isRunning, status]);


  return (
    <div>
      <div>{time}</div>
    </div>
  );
};

export default Countdown;
