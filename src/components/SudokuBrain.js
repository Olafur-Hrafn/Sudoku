import React, { useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import '../components/styles.css';

function SudokuBoard() {
  const { solvedBoard, difficultyLevel, SetSolvedBoard, SetCurrentBoard } =
    useContext(UserContext);
  let startingBoard = [];

  function generateBoard() {
    const matrix = Array(9)
      .fill()
      .map(() => Array(9).fill(0));

    //  let nextZero = FindZero(board)
    // 3 steps to randomly assign 3x3 squares of numbers
    // Top left 3x3
    let rndNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(rndNumbers);
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        matrix[i][k] = rndNumbers[0];
        rndNumbers.splice(0, 1);
      }
    }
    // re initialize rndNumbers and shuffle to add to middle 3x3
    rndNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(rndNumbers);
    for (let i = 3; i < 6; i++) {
      for (let k = 3; k < 6; k++) {
        matrix[i][k] = rndNumbers[0];
        rndNumbers.shift();
      }
    }

    // shuffle and arrange the last 3x3 ( bottom right square)
    // re initialize rndNumbers
    rndNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(rndNumbers);
    for (let i = 6; i < 9; i++) {
      for (let k = 6; k < 9; k++) {
        matrix[i][k] = rndNumbers[0];
        rndNumbers.shift();
      }
    }

    startingBoard = [...matrix];

    SolveBoard(startingBoard);
  }

  function shuffle(numberArray) {
    // Fisher Yates Shuffle //

    let currentIndex = numberArray.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [numberArray[currentIndex], numberArray[randomIndex]] = [
        numberArray[randomIndex],
        numberArray[currentIndex],
      ];
    }
    // Used like so
    //console.log(numberArray);
    return numberArray;
  }

  function FindZero(board) {
    //finds next 0 on board and returns its location//
    let zeroPlacement = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          zeroPlacement.push(i);
          zeroPlacement.push(j);
          return zeroPlacement;
        }
        if (zeroPlacement.length !== 0) {
          return null;
        }
      }
    }
    return null;
  }

  function IsValidPlacement(row, col, value) {
    // 3 if statements, nr. 1 checks for horizontal duplicates. Nr 2 = Vertical duplicates. Nr 3 = 3x3 block duplicated
    for (let i = 0; i < startingBoard.length; i++) {
      if (startingBoard[row][i] === value) {
        return false;
      }
      if (startingBoard[i][col] === value) {
        return false;
      }
      if (
        startingBoard[Math.floor(row - (row % 3) + i / 3)][
          Math.floor(col - (col % 3) + (i % 3))
        ] === value
      ) {
        return false;
      }
    }
    return true;
  }

  function SolveBoard(boardToSolve) {
    let solved = startingBoard;

    let nextZero = [];
    nextZero = FindZero(solved);

    // Base Case
    // uses find_zero to locate 0, if there are no more 0, job done, return board
    if (nextZero === null) {
      return solved;
    }
    // Recursive Case
    else {
      let row = nextZero[0];
      let col = nextZero[1];

      for (let i = 1; i < 10; i++) {
        if (IsValidPlacement(row, col, i) === true) {
          solved[row][col] = i;
          let updatedBoard = [];
          updatedBoard = SolveBoard(updatedBoard);

          // if there is a solution, return the solution
          if (updatedBoard != null) {
            solved = [...updatedBoard];

            SetSolvedBoard([...solved]);
            startingBoard = [];
            return updatedBoard;
          } else {
            solved[row][col] = 0;
          }
        }
      }
    }
  }

  function boardLevel() {
    //let tempBoard = Array.from(solvedBoard);
    let newBoard = JSON.parse(JSON.stringify(solvedBoard));

    if (difficultyLevel === 1) {
      for (let i = 0; i < 44; i++) {
        const randomCol = Math.floor(Math.random() * newBoard.length);
        const randomRow = Math.floor(Math.random() * newBoard.length);
        try {
          if (newBoard[randomCol][randomRow] !== 0) {
            newBoard[randomCol][randomRow] = 0;
          } else {
            i--;
          }
        } catch (error) {
          //console.log(error);
        }
      }
    } else if (difficultyLevel === 2) {
      for (let i = 0; i < 49; i++) {
        const randomCol = Math.floor(Math.random() * newBoard.length);
        const randomRow = Math.floor(Math.random() * newBoard.length);

        try {
          if (newBoard[randomCol][randomRow] !== 0) {
            newBoard[randomCol][randomRow] = 0;
          } else {
            i--;
          }
        } catch (error) {
          //console.log(error);
        }
      }
    } else if (difficultyLevel === 3) {
      for (let i = 0; i < 54; i++) {
        const randomCol = Math.floor(Math.random() * newBoard.length);
        const randomRow = Math.floor(Math.random() * newBoard.length);

        try {
          if (newBoard[randomCol][randomRow] !== 0) {
            newBoard[randomCol][randomRow] = 0;
          } else {
            i--;
          }
        } catch (error) {
          //console.log(error);
        }
      }
    }

    SetCurrentBoard([...newBoard]);
  }
  
  useEffect(() => {
    generateBoard();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyLevel]);

  useEffect(() => {
    boardLevel();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedBoard]);
  

  return <></>;
}
export default SudokuBoard;
