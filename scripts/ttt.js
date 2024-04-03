const PLAYER_SYMBOL = "X";
const COMPUTER_SYMBOL = "O";
const EDGES = [1, 3, 5, 7];

function buildBoolArray(symbol) {
  const cells = document.querySelectorAll(".square");
  let board = [[], [], []];
  cells.forEach((div) => {
    index = Number(div.id.at(5));
    board[Math.floor(index / 3)][index % 3] = div.innerHTML == symbol;
  });
  return board;
}

function getPossibleMoves(board) {
  let moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j]) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
}

function checkColumn(index, board) {
  const column = index % 3;
  let cells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i][column]) {
      return { win: false, cells: [] };
    }
    cells.push(i * 3 + column);
  }
  return { win: true, cells: cells };
}

function checkRow(index, board) {
  const row = parseInt(index / 3);
  let cells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[row][i]) {
      return { win: false, cells: [] };
    }
    cells.push(row * 3 + i);
  }
  return { win: true, cells: cells };
}

function checkDiagonalL(index, board) {
  if (EDGES.includes(index)) {
    return false;
  }
  let cells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i][i]) {
      return { win: false, cells: [] };
    }
    cells.push(i * 3 + i);
  }
  return { win: true, cells: cells };
}

function checkDiagonalR(index, board) {
  if (EDGES.includes(index)) {
    return false;
  }
  let cells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[board.length - i - 1][i]) {
      return { win: false, cells: [] };
    }
    cells.push((2 - i) * 3 + i);
  }
  return { win: true, cells: cells };
}

function checkMoveForWin(index, board) {
  const column = checkColumn(index, board);
  const row = checkRow(index, board);
  const diagonalL = checkDiagonalL(index, board);
  const diagonalR = checkDiagonalR(index, board);
  return {
    win: column.win | row.win | diagonalL.win | diagonalR.win,
    cells: [
      ...column.cells,
      ...row.cells,
      ...diagonalL.cells,
      ...diagonalR.cells,
    ],
  };
}

function checkForWin(cell, symbol) {
  const index = cell.id.at(5);
  const board = buildBoolArray(symbol);
  return checkMoveForWin(index, board);
}

function setCellBGColor(color, cells) {
  cells.forEach((currentValue) => {
    const cell = document.querySelector(`#cell-${currentValue}`);
    cell.style.backgroundColor = color;
  });
}

function evalMove(board, cell, depth) {}

function miniMax(board, player, depth) {}

function endGame(symbol, conditions) {
  const cells = document.querySelectorAll(".square");
  if ([PLAYER_SYMBOL, COMPUTER_SYMBOL].includes(symbol)) {
    const color = symbol == PLAYER_SYMBOL ? "#90ee90" : "#ee9090";
    setCellBGColor(color, conditions.cells);
    const winner = symbol == PLAYER_SYMBOL ? "#playerScore" : "#computerScore";
    const winScore = document.querySelector(winner);
    const score = parseInt(winScore.innerHTML);
    winScore.innerHTML = score + 1;
  }
  cells.forEach((div) => {
    div.removeEventListener("click", handleClickCell);
    div.addEventListener("click", setupGame);
  });
}

function handleComputerTurn(symbol = COMPUTER_SYMBOL) {
  const board = buildBoolArray("");
  console.log(board);
  const choices = getPossibleMoves(board);
  if (choices.length > 0) {
    const choice = choices[Math.floor(Math.random() * choices.length)];
    const index = choice[0] * 3 + choice[1];
    const cell = document.querySelector(`#cell-${index}`);
    cell.innerHTML = symbol;
    const winConditions = checkForWin(cell, symbol);
    if (winConditions.win) {
      endGame(symbol, winConditions);
    }
  } else {
    endGame();
  }
}

function handleClickCell(event, symbol = PLAYER_SYMBOL) {
  const cell = document.querySelector(`#${event.target.id}`);
  if (cell.innerHTML == "") {
    cell.innerHTML = symbol;
    const winConditions = checkForWin(cell, symbol);
    if (winConditions.win) {
      endGame(symbol, winConditions);
    } else {
      handleComputerTurn();
    }
  }
}

function setupGame() {
  const cells = document.querySelectorAll(".square");
  cells.forEach((div) => {
    div.removeEventListener("click", setupGame);
    setCellBGColor("white", [div.id.at(5)]); // Yes I know it's janky
    div.innerHTML = "";
    div.addEventListener("click", handleClickCell);
  });
}

document.addEventListener("DOMContentLoaded", setupGame);
