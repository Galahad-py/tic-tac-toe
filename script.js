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

        document.getElementById("reset").addEventListener("click", () => {
            GameController.resetGame();
        });
  
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
            DisplayController.showMessage(`Player ${winner} wins!`);
            gameActive = false;
            return;
          }
  
          if (isBoardFull()) {
            DisplayController.showMessage("It's a draw!");
            gameActive = false;
            return;
          }
  
          switchPlayer();
          DisplayController.showMessage(`Player ${currentPlayer}'s turn`);
        } else {
          console.log("Invalid move! Try again");
        }
      };
  
      const resetGame = () => {
        GameBoard.resetBoard();
        currentPlayer = "X";
        gameActive = true;
        DisplayController.renderBoard(); // Reset the UI
        DisplayController.showMessage("Game reset. Player X starts.");
      };
  
      return { playMove, resetGame };
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
    DisplayController.renderBoard();
    DisplayController.showMessage("Player X starts");
  
    // Public API
    return {
      playMove: GameController.playMove,
      resetGame: GameController.resetGame,
    };
  })();