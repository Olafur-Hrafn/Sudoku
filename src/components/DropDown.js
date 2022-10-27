import { React, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';

function Dropdown() {
  const {
    isActive,
    setIsActive,
    SetSolvedBoard,
    isSolved,
    SetIsSolved,
    SetDifficultyLevel,
  } = useContext(UserContext);

  function handleDomClick() {
    // if New game dropdown is open. watch for any dom click to close dropdown
    if (isActive) {
      document.addEventListener('click', (event) => {

        if (
          isActive === true &&
          event.target.id !== 'drop' &&
          event.target.id !== 'ButtonA'
        ) {
          setIsActive(false);
        }
      });
    }
  }

  async function handleDifficulty(e) {
    // using async function to get SetDifficultyLevel to change so it triggers a new generateBoard() in SudokuBrain
    if (e.target.id === 'easy') {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(1);
    } else if (e.target.id === 'medium') {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(2);
    } else if (e.target.id === 'hard') {
      await SetDifficultyLevel(0);
      SetDifficultyLevel(3);
    }
  }

  function handlePick(e) {
    // calls for a new game and resets the solvedBoard
    handleDifficulty(e);
    if (isSolved) {
      SetSolvedBoard([]);
      SetIsSolved((current) => !current);
    }
    setIsActive(!isActive);
  }

  function handleIsActive() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    handleDomClick();
  });

  return (
    <div id='drop' className='dropdown'>
      <div id='ButtonA' onClick={handleIsActive} className='dropdown-btn'>
        New Game
      </div>
      {isActive && (
        <div className='dropdown-content'>
          <div id='easy' onClick={handlePick} className='dropdown-item'>
            Easy
          </div>
          <div id='medium' onClick={handlePick} className='dropdown-item'>
            Medium
          </div>
          <div id='hard' onClick={handlePick} className='dropdown-item'>
            Hard
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
