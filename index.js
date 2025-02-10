const board = document.getElementById("gameBoard");
const gameGrid = document.getElementsByClassName("gameGrid");
const restartBtn = document.getElementById('restartBtn');
const gameOverMenu = document.getElementsByClassName('gameOverMenu')[0];
const winnerTxt = document.getElementById("winnerTxt");
const gameboard = (function(){
  let state = {
    board: [["", "", ""],["", "", ""],["", "", ""]],
    prevBoard: [["", "", ""],["", "", ""],["", "", ""]],
    isGameOver: false,
    winner: "Tie",
    turn: "player",
  }
  const getBoard = ()=> {
    return state.board;
  }
  const getTurn = function() {
    return state.turn;
  }
  const getPrevBoard = () =>{
    return state.prevBoard;
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
    if (state.winner == "Tie") {
      winnerTxt.textContent = `${state.winner}`;
    } else {
      winnerTxt.textContent = `${state.winner} won!`;
    }
  }
  function toggleTurn () {
    if (state.turn=="player") {
      state.turn = "computer";
    } else {
      state.turn = "player";
    }
  }
  const placeMove = function(col, row, val) {
    state.prevBoard = structuredClone(state.board);
    if (gameboard.getIsGameOver()==false) {
      state.board[row][col] = val;
      if (checkForWinner() != false) {
        state.winner=checkForWinner();
        this.handleGameOver();
      }
      else if (!this.hasEmptySpace()) {
        this.handleGameOver();
      }
    }
  }
  const clear = function() {
    clearAnim();
    gameOverMenu.style.visibility='hidden';
    state = {
      board: [["", "", ""],["", "", ""],["", "", ""]],
      prevBoard: [["", "", ""],["", "", ""],["", "", ""]],
      isGameOver: false,
      winner: "Tie",
      turn: "player",
    }
    updateBoard();

  }
  function clearAnim() {
    for (let i = 0; i < gameGrid.length; i++) {
      gameGrid[i].classList.remove('hidden');
      gameGrid[i].classList.remove('visible');
    }
  }
  function animatePlaceMark(element) {
      element.classList.add('hidden');
      element.classList.remove('visible');
        setTimeout(function() {
          element.classList.add('visible');
          element.classList.remove('hidden');
          toggleTurn();
        }, 100)
  }
  const updateBoard = function() {
    for (let i = 0; i<gameGrid.length; i++) {
      if (getBoard()[Math.floor(i/3)][i%3] == player.playerInfo.marker) {
        gameGrid[i].classList.add('player');
        gameGrid[i].classList.remove('none');
        gameGrid[i].textContent = player.playerInfo.marker;
        if (getBoard()[Math.floor(i/3)][i%3] != getPrevBoard()[Math.floor(i/3)][i%3]) {
          animatePlaceMark(gameGrid[i]);
        }
      } else if (getBoard()[Math.floor(i/3)][i%3] == game.getAIInfo().marker) {
          gameGrid[i].classList.add('computer');
          gameGrid[i].classList.remove('none');
          gameGrid[i].textContent = game.getAIInfo().marker;
          
          if (getBoard()[Math.floor(i/3)][i%3] != getPrevBoard()[Math.floor(i/3)][i%3]) {
            animatePlaceMark(gameGrid[i]);
          }
      } else if ((getBoard()[Math.floor(i/3)][i%3] == "")){
        gameGrid[i].classList.remove('player');
        gameGrid[i].classList.remove('computer');
        gameGrid[i].classList.add('none');
        gameGrid[i].classList.add('gameGrid');
        gameGrid[i].textContent = "";
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
        if (counter>2) {
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
      return "Computer";
    } else if (checkVert(player.playerInfo.marker) || checkHori(player.playerInfo.marker) || checkDiag(player.playerInfo.marker)) {
      return "Player";
    } else {
      return false;
    }
  }
  return {getTurn, checkForWinner, getPrevBoard, getBoard, getIsGameOver, placeMove, clear, getSquare, updateBoard, handleGameOver, hasEmptySpace}
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
    if (gameboard.getTurn() == "player") {
      if (gameGrid[i].textContent=="") {
        gameboard.placeMove(i%3, Math.floor(i/3), player.playerInfo.marker);
        gameboard.updateBoard();
        
        game.placeRandom(); 
        setTimeout(function() {
        gameboard.updateBoard();
      }, 200)
      }
      
    }
  })
}