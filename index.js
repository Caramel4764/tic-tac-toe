let board = document.getElementById("gameBoard");
let gameGrid = document.getElementsByClassName("gameGrid");
const gameboard = (function(){
  const board = [["", "", ""],["", "", ""],["", "", ""]];
  const getBoard = ()=> {
    return board;
  }
  const getSquare = function(col, row) {
    return board[row][col];
  }
  const hasEmptySpace = function () {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        //row/col
        if (board[i][j] == "") {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  const placeMove = function(col, row, val) {
    board[row][col] = val;
  }
  const clear = function() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        //row/col
        board[i][j] = "";
      }
    }
  }
  const updateBoard = function() {
    for (let i = 0; i<gameGrid.length; i++) {
      if (this.getBoard()[Math.floor(i/3)][i%3] == player.playerInfo.marker) {
        gameGrid[i].classList.add('player');
        gameGrid[i].classList.remove('none');
      }
    }
  }
  return {getBoard, placeMove, clear, getSquare, updateBoard}
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
  function placeRandom(marker) {
    for(;;) {
      let ranRow = Math.floor(Math.random()*3);
      let ranCol = Math.floor(Math.random()*3);
      if (gameboard.getSquare(ranCol, ranRow) == "") {
        gameboard.placeMove(ranCol, ranRow, marker);
        return;
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
        if (counter>=2) {
          return true;
        }
      }
    }
    counter = 0;
    for (let i = 0; i<gameboard.getBoard().length;i++) {
      if (gameboard.getSquare(i, (gameboard.getBoard()[0].length-1)-i) == marker) {
        counter++;
        if (counter>=2) {
          return true;
        }
      }
    }
    return false;
  }
  //checks if anyone has won. False if no one and a player or pc if there's winner
  function checkForWinner () {
    if (checkVert(AIInfo.marker) || checkHori(AIInfo.marker) || checkDiag(AIInfo.marker)) {
      return "AI";
    } else if (checkVert(player.playerInfo.marker) || checkHori(player.playerInfo.marker) || checkDiag(player.playerInfo.marker)) {
      return "player";
    } else {
      return false;
    }
  }
  return {placeRandom, checkForWinner, checkVert, AIInfo}
}());
//console.log(gameboard.getBoard()[0].length)

//game.AIInfo.marker
//console.log(game.checkForWinner());

//game.placeRandom("O");

for(let i = 0; i < gameGrid.length; i++) {
  gameGrid[i].addEventListener('click', function() {
    gameboard.placeMove(i%3, Math.floor(i/3), player.playerInfo.marker)
    gameboard.updateBoard()
    console.log(gameboard.getBoard());
  })
}