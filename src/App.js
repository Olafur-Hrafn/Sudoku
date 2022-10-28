import React, { useState } from 'react';
import SudokuBrain from './components/SudokuBrain';
import SudokuBoard from './components/SudokuBoard';
import SolvedScreen from './components/SolvedScreen';
import '../src/components/styles.css';
import { UserContext } from './userContext';
import Dropdown from './components/DropDown';
import Timer from './components/Timer';

function App() {
  const [theme, setTheme] = useState('theme' ? 'dark' : 'light');
  const [solvedBoard, SetSolvedBoard] = useState([]);
  const [difficultyLevel, SetDifficultyLevel] = useState(1);
  const [currentBoard, SetCurrentBoard] = useState([]);
  const [userAttempt, SetUserAttempt] = useState([]);
  const [isSolved, SetIsSolved] = useState(false);
  const [scoreCard, SetScoreCard] = useState({ time: 0 });
  const [hintCounter, SetHintCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <UserContext.Provider
      value={{
        difficultyLevel,
        SetDifficultyLevel,
        isSolved,
        SetIsSolved,
        theme,
        setTheme,
        solvedBoard,
        SetSolvedBoard,
        currentBoard,
        SetCurrentBoard,
        userAttempt,
        SetUserAttempt,
        scoreCard,
        SetScoreCard,
        hintCounter,
        SetHintCounter,
        isActive,
        setIsActive,
      }}
    >
      <div className='app' data-theme={theme}>
        <div className='title'>
          <h1>Sudoku Maniac</h1>
        </div>
        <div className='smallscreenTimeAndDrop'>
          <Dropdown />
          <Timer />
        </div>

        <div className=''>
        { isSolved
          ?<SolvedScreen />
          :null
        }
          <div className='sudokuBoardWrapper'>
            <div>
              <SudokuBoard />
            </div>

            <div className='controlWrapper'>
              <SudokuBrain />
            </div>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

