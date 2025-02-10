const board = document.getElementById("gameBoard");
const gameGrid = document.getElementsByClassName("gameGrid");
const restartBtn = document.getElementById('restartBtn');
const gameOverMenu = document.getElementsByClassName('gameOverMenu')[0];
const winnerTxt = document.getElementById("winnerTxt");
const gameboard = (function(){
  let state = {
    board: [["", "", ""],["", "", ""],["", "", ""]],
    isGameOver: false,
    winner: "Tie",
  }
  const getBoard = ()=> {
    return state.board;
  }
  const getIsGameOver = function () {
    return state.isGameOver;
  }
  const getSquare = function(col, row) {
    return state.board[row][col];
  }
  const hasEmptySpace = function () {
    for (let i = 0; i < state.board.length; i++) {
      for (let j = 0; j < state.board[i].length; j++) {
        //row/col
        if (state.board[i][j] == "") {
          return true;
        }
      }
    }
    return false;
  }
  const handleGameOver = function () {
    state.isGameOver = true;
    gameOverMenu.style.visibility = 'visible';
    winnerTxt.textContent = state.winner;
    state.winner="Tie";
  }
  const placeMove = function(col, row, val) {
    if (gameboard.getIsGameOver()==false) {
      state.board[row][col] = val;
      if (checkForWinner() != false) {
        console.log(checkForWinner())
        state.winner=checkForWinner();
        this.handleGameOver();
      }
      else if (!this.hasEmptySpace()) {
        this.handleGameOver();
      }
    }
  }
  const clear = function() {
    for (let i = 0; i < state.board.length; i++) {
      for (let j = 0; j < state.board[i].length; j++) {
        //row/col
        state.board[i][j] = "";
      }
    }
    state.isGameOver = false;
    console.log(getBoard())
    updateBoard();
    gameOverMenu.style.visibility='hidden';
  }
  const updateBoard = function() {
    for (let i = 0; i<gameGrid.length; i++) {
      if (getBoard()[Math.floor(i/3)][i%3] == player.playerInfo.marker) {
        gameGrid[i].classList.add('player');
        gameGrid[i].classList.remove('none');
      } else if (getBoard()[Math.floor(i/3)][i%3] == game.getAIInfo().marker) {
        gameGrid[i].classList.add('computer');
        gameGrid[i].classList.remove('none');
      } else if ((getBoard()[Math.floor(i/3)][i%3] == "")){
        gameGrid[i].classList.remove('player');
        gameGrid[i].classList.remove('computer');
        gameGrid[i].classList.add('none');
        gameGrid[i].classList.add('gameGrid');
      }
    }
  }
  function checkHori (marker) {
    for (let i = 0; i<gameboard.getBoard().length; i++) {
      let counter = 0;
      for (let j = 0; j<gameboard.getBoard()[0].length; j++) {
        if (gameboard.getSquare(j, i) == marker) {
          counter++;
          if (counter >= 3) {
            console.log({horizontal: true})
            return true;
          }
        }
      }
    }
    return false;
  }
  function checkVert (marker) {
    for (let i = 0; i<gameboard.getBoard().length; i++) {
      let counter = 0;
      for (let j = 0; j<(gameboard.getBoard())[0].length; j++) {
        if (gameboard.getSquare(i, j) == marker) {
          counter++;
          if (counter >= 3) {
            console.log({vertical: true})
            return true;
          }
        }
      }
    }
    return false;
  }
  function checkDiag(marker) {
    let counter = 0;
    for (let i = 0; i<gameboard.getBoard().length;i++) {
      if (gameboard.getSquare(i, i) == marker) {
        counter++;
        console.log({marker: marker, count:counter})
        if (counter>2) {
          console.log({diag: true})
          return true;
        }
      }
    }
    counter = 0;
    for (let i = 0; i<gameboard.getBoard().length;i++) {
      if (gameboard.getSquare(i, (gameboard.getBoard()[0].length-1)-i) == marker) {
        counter++;
        if (counter>2) {
          return true;
        }
      }
    }
    return false;
  }
  //checks if anyone has won. False if no one and a player or pc if there's winner
  function checkForWinner () {
    if (checkHori(game.getAIInfo().marker) || checkVert(game.getAIInfo().marker) || checkDiag(game.getAIInfo().marker)) {
      console.log({ai: true})
      return "Computer";
    } else if (checkVert(player.playerInfo.marker) || checkHori(player.playerInfo.marker) || checkDiag(player.playerInfo.marker)) {
      console.log({player: true})
      return "Player";
    } else {
      return false;
    }
  }
  return {checkForWinner, getBoard, getIsGameOver, placeMove, clear, getSquare, updateBoard, handleGameOver, hasEmptySpace}
})();

const player = (function(){
  let playerInfo = {
    wins: 0,
    marker: "X"
  }
  return {playerInfo}
}());

const game = (function(){
  let AIInfo = {
    wins: 0,
    marker: "O",
  }
  function placeRandom() {
    while (gameboard.hasEmptySpace()&&(gameboard.getIsGameOver()==false)) {
      let ranRow = Math.floor(Math.random()*3);
      let ranCol = Math.floor(Math.random()*3);
      if (gameboard.getSquare(ranCol, ranRow) == "") {
        gameboard.placeMove(ranCol, ranRow, AIInfo.marker);
        return;
      }
    }
  }
  function getAIInfo () {
    return AIInfo;
  }
  return {placeRandom, getAIInfo}
}());
restartBtn.addEventListener('click', function() {
  gameboard.clear();
})

for(let i = 0; i < gameGrid.length; i++) {
  gameGrid[i].addEventListener('click', function() {
    gameboard.placeMove(i%3, Math.floor(i/3), player.playerInfo.marker)
    game.placeRandom();
    gameboard.updateBoard();
    //console.log(gameboard.getBoard());
  })
}