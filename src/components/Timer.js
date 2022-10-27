import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import ThemeSlider from './ThemeSlider';

const Timer = () => {
  const { difficultyLevel, isSolved, SetScoreCard } =
    useContext(UserContext);
  const [time, setTime] = useState(0);

  

  useEffect(() => {
    let interval;
    if (!isSolved) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (isSolved) {
      clearInterval(interval);
      SetScoreCard({ time: time });
    }
    return () => clearInterval(interval);
  }, [isSolved]);

  useEffect(() => {
    setTime(0);
  }, [difficultyLevel]);

  return (
    <div className='timerContainer'>
      <div className='numbers'>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        <ThemeSlider/>
      </div>
    </div>
  );
};

export default Timer;
