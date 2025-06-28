const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const gameMode = localStorage.getItem('gameMode') || '2p';

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  if (gameMode === 'ai') {
    currentPlayer = 'O';
    setTimeout(makeAIMove, 500);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function makeAIMove() {
  if (!gameActive) return;
  let index = getBestMove();
  if (index === -1) return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
}

function getBestMove() {
  let empty = gameBoard.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      return true;
    }
  }
  return false;
}
