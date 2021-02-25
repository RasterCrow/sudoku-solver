let game = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function sudokuSolver(matrix) {
  if (solveSudoku(matrix)) {
    console.log("matrix : ", matrix);
    return matrix;
  }
  console.log("There is no solution for the given matrix.");
  return false;
}

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let isSpaceBlank = false;
  // check next blank space.
  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        isSpaceBlank = true;
        break;
      }
    }
    if (isSpaceBlank) {
      break;
    }
  }
  //if there is none it means the game is ended.
  if (!isSpaceBlank) {
    return true;
  }

  //for each possible number
  for (let n = 1; n <= 9; n++) {
    //check safe to assign (number not present in row, column and 3x3 grid):
    if (check_safety(matrix, row, col, n)) {
      //assign number and check recursively if it works..
      matrix[row][col] = n;
      if (solveSudoku(matrix)) {
        return true;
      }
      //if doesn't return true it means n is not correct, so I reset the position to 0 and continue with next number.
      matrix[row][col] = 0;
    }
  }
  // if no number works, return false.
  return false;
}

//checks number not present in row, column and 3x3 grid.
function check_safety(matrix, row, col, number) {
  //check if it's already in row
  if (!check_row(matrix, row, number)) {
    //check if it's already in column
    if (!check_col(matrix, col, number)) {
      //check if is in square
      if (!check_quadrant(matrix, row - (row % 3), col - (col % 3), number)) {
        //all safety correct, can add number
        return true;
      }
    }
  }
  return false;
}

function check_row(matrix, row, number) {
  return matrix[row].find((x) => x == number);
}

function check_col(matrix, col, number) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] == number) return true;
  }
  return false;
}

function check_quadrant(matrix, xQuadrant, yQuadrant, number) {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (matrix[x + xQuadrant][y + yQuadrant] == number) {
        return true;
      }
    }
  }
  return false;
}

console.log(sudokuSolver(game));
