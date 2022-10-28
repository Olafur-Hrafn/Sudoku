import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../userContext';
import './styles.css';
import Controls from '../components/Controls';

function Board(props) {
  const { solvedBoard, currentBoard,isSolved, SetIsSolved, SetHintCounter } =
    useContext(UserContext);
  const [hintsCount, SetHintsCount] = useState(0);

  let refs = useRef(null);
  refs.current = document.getElementsByClassName('SudokuBlock')[2];
  let liveBoard = [];
  let anwser = [];
  let hintsFromControls = 0;

  async function handleMovement(e, idx) {
    let currentBox = document.getElementsByClassName('SudokuBlock')[idx];
    switch (true) {
      case e.keyCode === 38 && idx > 8:
        refs.current = document.getElementsByClassName('SudokuBlock')[idx - 9];
        refs.current.focus();
        break;
      case e.keyCode === 37 && idx > 0:
        refs.current = document.getElementsByClassName('SudokuBlock')[idx - 1];
        refs.current.focus();
        break;
      case e.keyCode === 39 && idx < 80:
        refs.current = document.getElementsByClassName('SudokuBlock')[idx + 1];
        refs.current.focus();
        break;
      case e.keyCode === 40 && idx < 72:
        refs.current = document.getElementsByClassName('SudokuBlock')[idx + 9];
        refs.current.focus();
        break;
      case e.key >= 1 && e.key <= 9 && isNaN(parseInt(liveBoard[idx])):
        document.getElementsByClassName('SudokuBlock')[idx].innerText = e.key;
        anwser[idx] = parseInt(e.key);
        checkSolution(hintsFromControls);
        break;
      case (e.keyCode === 46 || e.keyCode === 8) &&
        currentBox.innerText !== liveBoard[idx]:
        document.getElementsByClassName('SudokuBlock')[idx].innerText = '';
        break;

      default:
       return;
    }
  }

  function printBoard(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          liveBoard.push('  ');
        } else {
          liveBoard.push(board[i][j]);
        }
      }
    }
    anwser = [...liveBoard];
    // const array = anwser.map(a => ({...a}));
    return liveBoard.map((item, idx) => (
      <div
        key={idx}
        id={idx}
        ref={refs[idx]}
        tabIndex='0'
        className='SudokuBlock'
        onClick={(e) => handleClick(e, idx)}
        onKeyDown={(e) => handleMovement(e, idx)}
      >
        {item}
      </div>
    ));
  }

  let board = printBoard(currentBoard);

  function handleClick(e, idx) {
    // focus clicked div + put as refs.current
    refs.current = document.getElementsByClassName('SudokuBlock')[idx];
    refs.current.focus();
  }

  function updateHints() {}

  function checkSolution(hints) {
    // check if player has soulution right
    hintsFromControls = hints;

    let TempSolvedBoard = solvedBoard;
    TempSolvedBoard = TempSolvedBoard.flat();

    const tempArr = document.getElementsByClassName('SudokuBlock');

    let xAnwser = [];
    for (let i = 0; i < tempArr.length; i++) {
      let text = tempArr[i].innerText;
      if (text === '') {
        text = tempArr[i].innerText;
        xAnwser.push(text);
      } else {
        text = tempArr[i].innerText;
        xAnwser.push(parseInt(text));
      }
    }

    if (JSON.stringify(TempSolvedBoard) === JSON.stringify(xAnwser)) {
      SetHintCounter(hintsFromControls);
      //SetIsSolved((current) => !current);
    }
  }

  useEffect(() => {
    if(!isSolved){checkSolution();}
  },);

  useEffect(() => {
    if (liveBoard.length > 1) {
      refs.current = document.getElementsByClassName('SudokuBlock')[2];
      refs.current.focus();
    }
  }, );

  return (
    <div className='BoardAndControllerWrap'>
      <div className='BoardContainer'>{board}</div>
      <div className='controlWrapper'>
        <Controls
          lastRef={refs}
          liveBoard={liveBoard}
          checkSolution={checkSolution}
          isSolved={props.isSolved}
          switchTheme={props.switchTheme}
          updateHints={updateHints}
          SetHintsCount={SetHintsCount}
          hintsCount={hintsCount}
        />
      </div>
    </div>
  );
}
export default Board;
