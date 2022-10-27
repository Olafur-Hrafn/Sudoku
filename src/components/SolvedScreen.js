import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopwatch,
  faLightbulb,
  faBrain,
} from '@fortawesome/free-solid-svg-icons';
import '../components/styles.css';

function SolvedScreen() {
  const {
    SetSolvedBoard,
    SetIsSolved,
    SetDifficultyLevel,
    difficultyLevel,
    isSolved,
    scoreCard,
    hintCounter,
  } = useContext(UserContext);

  let hint = localStorage.getItem ("hintCounter")

  async function newGame(e) {
    let lvl = parseInt(e.target.value);
    SetDifficultyLevel(lvl);
    if (lvl === 1) {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(1);
    } else if (lvl === 2) {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(2);
    } else if (lvl === 3) {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(3);
    }

    if (isSolved) {
      SetSolvedBoard([]);
      SetIsSolved((current) => !current);
    }
  }

  const level = () => {
    let levelName = 'hmmmmm';
    if (difficultyLevel === 1) {
      levelName = 'Easy';
    } else if (difficultyLevel === 2) {
      levelName = 'Medium';
    } else if (difficultyLevel === 3) {
      levelName = 'Hard';
    }
    return <span>{levelName}</span>;
  };

  let levelname = level();

  
    return (
      <div className='solvedCardContainer'>
        <div className='solvedCardWrapper'>
          <h1>Congratulations</h1>
          <h2>You solved the puzzle</h2>
          <div className='scores'>
            <div className='time'>
              <span className='solvedCardTime'>
                <FontAwesomeIcon icon={faStopwatch} />
                Time:{' '}
                {('0' + Math.floor((scoreCard.time / 60000) % 60)).slice(-2)}:
              </span>
              <span className='solvedCardTime'>
                {('0' + Math.floor((scoreCard.time / 1000) % 60)).slice(-2)}
              </span>
            </div>
            <div className='hints'>
              <span>
                <FontAwesomeIcon icon={faLightbulb} /> Hints: {hint}
              </span>
            </div>
            <div className='lvlName'>
              <span>
                <FontAwesomeIcon icon={faBrain} />
                Level:{levelname}
              </span>
            </div>
            <h2 className='solvedH2Text'>
              <div className='playAgain'>Play again</div>
            </h2>
            <div className='solvedCardButtonWrapper'>
              <button value='1' className='dropdown-btn' onClick={newGame}>
                Easy
              </button>
              <button value='2' className='dropdown-btn' onClick={newGame}>
                Medium
              </button>
              <button value='3' className='dropdown-btn' onClick={newGame}>
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default SolvedScreen;
