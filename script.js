const TicTactoe =  (() => {
    const GameBoard = (() => {
        const board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board

        const getBoard = () => board; // return the board

        const makeMove = (position, player) => {
            if (board[position] === "") { // check if the position is empty
                board[position] = player; // make the move
                return true; // return true if the move is successful
            }
            return false; // return false if the move is unsuccessful
        };

        const resetBoard = () => {
            for (let i = 0; i < board.length; i++) { // loop through the board
                board[i] = ""; // reset the board
            }
        };

        return { getBoard, makeMove, resetBoard }; // return the board, makeMove and resetBoard functions
    })(); // GameBoard module

    const GameController = (() => {
        let currentPlayer = "X"; // X starts the game
        let gameActive = true; // game is active

        const switchPlayer = () => {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // switch player
        };

        const checkWinner = () => { // check for the winner
            const board = GameBoard.getBoard(); // get the board
            const winningConditions = [ // winning conditions
                [0, 1, 2], // first row
                [3, 4, 5], // second row
                [6, 7, 8], // third row
                [0, 3, 6], // first column
                [1, 4, 7], // second column
                [2, 5, 8], // third column
                [0, 4, 8], // diagonal
                [2, 4, 6], // diagonal
            ];

            for(let combo of winningConditions) { // loop through the winning conditions  
                const [a, b, c] = combo; // destructure the combo
                if (
                    board[a] !== "" && 
                    board[a] === board[b] && 
                    board[a] === board[c]
                ) { // check if there is a winner
                    return board[a]; // return the winner
                }
            }
            return null; //no winner
        };

        const isBoardFull = () => {
            return GameBoard.getBoard().every((cell) => cell !== ""); // check if the board is full
        };

        const playMove = (position) => {
            if (!gameActive) {
                console.log("Game Over! Kindly restart a new game"); // game is over
                return; 
            }

            if (GameBoard.makeMove(position, currentPlayer)) {
                console.log(`Player ${currentPlayer} placed at position ${position}`); // make a move
                printBoard(); // print the board

                const winner = checkWinner(); // check for the winner
                if (winner) {
                    console.log(`Player ${winner} wins!`); // announce the winner
                    gameActive = false; // game is over
                    return;
                }

                if (isBoardFull()) {
                    console.log("It's a draw!"); // announce a draw
                    gameActive = false; // game is over
                    return;
                }

                switchPlayer(); // switch player
            } else {
                console.log("Invalid move! Try again"); // invalid move
            }
        };

        const resetGame = () => {
            GameBoard.resetBoard(); // reset the board
            currentPlayer = "X"; // X starts the game
            gameActive = true; // game is active
            console.log("Game has been reset. Player X starts."); // reset the game
        };

        const printBoard = () => {
            const board = GameBoard.getBoard(); // get the board
            console.log(`
            ${board[0]} | ${board[1]} | ${board[2]}
            ---------
            ${board[3]} | ${board[4]} | ${board[5]}
            ---------
            ${board[6]} | ${board[7]} | ${board[8]}
            `); // print the board
        };

        return { playMove, resetGame, printBoard }; // return the playMove, resetGame and printBoard functions
    })();

    return{
        playMove: GameController.playMove, // playMove function
        resetGame: GameController.resetGame, // resetGame function
        printBoard: GameController.printBoard // printBoard function
    };
})();

TicTactoe.printBoard(); // print the board
TicTactoe.playMove(0); // Player X places at position 0
TicTactoe.playMove(4); // Player O places at position 4
TicTactoe.playMove(1); // Player X places at position 1
TicTactoe.playMove(5); // Player O places at position 5
TicTactoe.playMove(2); // Player X places at position 2