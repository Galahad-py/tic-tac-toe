const TicTacToe = (() => {
    // GameBoard module
    const GameBoard = (() => {
      const board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board
  
      const getBoard = () => board;
  
      const makeMove = (position, player) => {
        if (board[position] === "") {
          board[position] = player;
          return true; // Move successful
        }
        return false; // Invalid move
      };
  
      const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
          board[i] = ""; // Clear the board
        }
      };
  
      return { getBoard, makeMove, resetBoard };
    })();
  
    // GameController module
    const GameController = (() => {
      let currentPlayer = "X"; // X starts the game
      let gameActive = true; // Game is active
      let player1Name = "Player 1"; // Default names
      let player2Name = "Player 2";
  
      const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      };
  
      const checkWinner = () => {
        const board = GameBoard.getBoard();
        const winningConditions = [
          [0, 1, 2], // Rows
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // Columns
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // Diagonals
          [2, 4, 6],
        ];
  
        for (let combo of winningConditions) {
          const [a, b, c] = combo;
          if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
          ) {
            return board[a]; // Return the winner
          }
        }
        return null; // No winner
      };
  
      const isBoardFull = () => {
        return GameBoard.getBoard().every((cell) => cell !== "");
      };
  
      const playMove = (position) => {
        if (!gameActive) {
          console.log("Game Over! Kindly restart a new game");
          return;
        }
  
        if (GameBoard.makeMove(position, currentPlayer)) {
          DisplayController.renderBoard(); // Update the UI
  
          const winner = checkWinner();
          if (winner) {
            const winnerName = winner === "X" ? player1Name : player2Name;
            DisplayController.showMessage(`${winnerName} wins!`);
            gameActive = false;
            return;
          }
  
          if (isBoardFull()) {
            DisplayController.showMessage("It's a draw!");
            gameActive = false;
            return;
          }
  
          switchPlayer();
          const currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
          DisplayController.showMessage(`${currentPlayerName}'s turn`);
        } else {
          console.log("Invalid move! Try again");
        }
      };
  
      const resetGame = () => {
        GameBoard.resetBoard();
        currentPlayer = "X";
        gameActive = true;
        DisplayController.renderBoard(); // Reset the UI
        DisplayController.showMessage(`${player1Name}'s turn`);
      };
  
      const setPlayerNames = (name1, name2) => {
        player1Name = name1 || "Player 1";
        player2Name = name2 || "Player 2";
      };
  
      return { playMove, resetGame, setPlayerNames };
    })();
  
    // DisplayController module
    const DisplayController = (() => {
      const boardElement = document.getElementById("board"); // Board container
      const messageElement = document.getElementById("message"); // Message display
  
      const renderBoard = () => {
        const board = GameBoard.getBoard();
        boardElement.innerHTML = ""; // Clear the board
  
        board.forEach((cell, index) => {
          const cellElement = document.createElement("div");
          cellElement.classList.add("cell");
          cellElement.textContent = cell;
          cellElement.addEventListener("click", () => {
            if (cell === "") {
              GameController.playMove(index); // Handle cell click
            }
          });
          boardElement.appendChild(cellElement);
        });
      };
  
      const showMessage = (message) => {
        messageElement.textContent = message;
      };
  
      return { renderBoard, showMessage };
    })();
  
    // Initialize the game
    const startGame = () => {
      const player1 = document.getElementById("player1").value.trim();
      const player2 = document.getElementById("player2").value.trim();
  
      if (!player1 || !player2) {
        alert("Please enter both player names!");
        return;
      }
  
      GameController.setPlayerNames(player1, player2);
  
      document.querySelector(".welcome-text").style.display = "none";
      document.querySelector(".input-container").style.display = "none";
  
      document.getElementById("message").style.display = "block";
      document.getElementById("board").style.display = "grid";
      document.getElementById("reset").style.display = "block";
  
      GameController.resetGame();
    };
  
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("reset").addEventListener("click", () => {
      GameController.resetGame();
    });
  
    // Public API
    return {
      playMove: GameController.playMove,
      resetGame: GameController.resetGame,
    };
  })();