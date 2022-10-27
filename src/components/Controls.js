import { React, useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import Dropdown from './DropDown';
import Timer from './Timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateLeft,
  faLightbulb,
  faFaceDizzy,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';

//  <FontAwesomeIcon icon={faLightbulb} />

function Controls(props) {
  const { solvedBoard, isSolved,difficultyLevel } = useContext(UserContext);
  let hints = 0;

  function handleNumberClick(e) {
    let ref = props.lastRef.current;

    if (
      isNaN(parseInt(props.liveBoard[ref.id])) &&
      e.target.innerText !== 'erase'
    ) {
      props.lastRef.current.innerText = e.target.innerText;
    }
    props.lastRef.current.focus();
    props.checkSolution(hints);
  }

  function undo(e) {
    // Animation for undo Arrow
    let arrow = document.querySelector('.undoButton .icon');
    arrow.classList.toggle('arrowTransition');
    setTimeout(function () {
      arrow.classList.toggle('arrowTransition');
    }, 2000);

    //Check if focused sudoku blocked is part of the original puzzle, then cant be changed
    let ref = props.lastRef.current;

    if (parseInt(ref.innerText) !== props.liveBoard[ref.id]) {
      props.lastRef.current.innerText = '';
    }
    props.lastRef.current.focus();
    props.checkSolution(hints);
  }

  function hint(e) {
    // Animation for LightBulb

    let bulb = document.querySelector('.lightBulb .icon');
    bulb.classList.toggle('bulbTransition');
    setTimeout(function () {
      bulb.classList.toggle('bulbTransition');
    }, 2000);

    // Get hint from the original puzzle
    let ref = props.lastRef.current;
    let solvedBoardFlat = solvedBoard.flat();
    if (
      parseInt(ref.innerText) !== props.liveBoard[ref.id] &&
      parseInt(ref.innerText) !== solvedBoardFlat[ref.id]
    ) {
      props.lastRef.current.innerText = solvedBoardFlat[ref.id];
      hints = hints + 1;
      let x = localStorage.getItem("hintCounter");
    
      localStorage.setItem("hintCounter", parseInt(x) + 1 );
    }

    props.lastRef.current.focus();
    props.checkSolution(hints);
  }

  function solve() {
    let solvedBoardFlat = solvedBoard.flat();
    const tempArr = document.getElementsByClassName('SudokuBlock');
    // set the innerText to the solved board, so the checkSoulution has a full innertext board to work with
    for (let i = 0; i < solvedBoardFlat.length; i++) {
      tempArr[i].innerText = solvedBoardFlat[i];
    }
    props.lastRef.current.focus();

    props.checkSolution(hints);
  }

  function skull(e) {
    if (isSolved) {
      return (
        <div className='inputKey solveIcon' onClick={solve}>
          {' '}
          <FontAwesomeIcon
            className='icon solveFace solveTransition'
            icon={faSkull}
          />
          <div className='iconButtons '>
            <div className='spanContainer'>
              <span className='solveSpanText1Animation'>Sol</span>
              <span className='solveSpanText2Animation'>ve</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='inputKey solveIcon' onClick={solve}>
          <FontAwesomeIcon className='icon solveFace' icon={faFaceDizzy} />
          <div className='iconButtons '>
            <span className='solve1animation'>Sol</span>
            <span className='solve2animation'>ve</span>
          </div>
        </div>
      );
    }
  }

  let faceIcon = skull();

  function inputKeys() {
    return (
      <div className='inputContainer'>
        <div value='1' className='inputKey' onClick={handleNumberClick}>
          1
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          2
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          3
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          4
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          5
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          6
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          7
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          8
        </div>
        <div className='inputKey' onClick={handleNumberClick}>
          9
        </div>
        <div className='inputKey undoButton' onClick={undo}>
          <FontAwesomeIcon className='icon' icon={faRotateLeft} />
          <span className='iconButtons'>Undo</span>
        </div>
        <div className='inputKey lightBulb' onClick={hint}>
          {' '}
          <FontAwesomeIcon className='icon' icon={faLightbulb} />
          <span className='iconButtons'>Hint</span>
        </div>
        {faceIcon}
      </div>
    );
  }
  let inputkeyList = inputKeys();

  useEffect(() => {
    localStorage.setItem("hintCounter", 0 );
  }, [difficultyLevel])
  return (
    <div className='controlContainer'>
      <div className='dropdownContainer'>
        <Dropdown />
      </div>
      <div className='timer1'>
        <Timer switchTheme={props.switchTheme} />
      </div>
      {inputkeyList}
    </div>
  );
}

export default Controls;
