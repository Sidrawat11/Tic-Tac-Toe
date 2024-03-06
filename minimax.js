// Function to determine the best move using the minimax algorithm
function minimax(board, depth, isMaximizing) {
    // Check if there is a winner
    let result = checkWinner(board);
    if (result !== null) {
        let score = 0;
        if (result === 'X') {
            score = 10 - depth;
        } else if (result === 'O') {
            score = depth - 10;
        } else if (result === "Tie") {
            score = 0;
        }
        return { score: score, move: null };
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = null;
        // Iterate through each cell on the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Make a move for the maximizing player ('X')
                    board[i][j] = 'X';
                    // Recursively call minimax for the next depth with isMaximizing set to false
                    let resultMove = minimax(board, depth + 1, false);
                    // Undo the move
                    board[i][j] = '';
                    // Update the best score and move if the current move is better
                    if (resultMove.score > bestScore) {
                        bestScore = resultMove.score;
                        bestMove = { row: i, col: j };
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        let bestMove = null;
        // Iterate through each cell on the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Make a move for the minimizing player ('O')
                    board[i][j] = 'O';
                    // Recursively call minimax for the next depth with isMaximizing set to true
                    let resultMove = minimax(board, depth + 1, true);
                    // Undo the move
                    board[i][j] = '';
                    // Update the best score and move if the current move is better
                    if (resultMove.score < bestScore) {
                        bestScore = resultMove.score;
                        bestMove = { row: i, col: j };
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    }
}

// Function to check if there is a winner or a tie
function checkWinner(board) {
    const players = ['X', 'O'];

    for (const player of players) {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if ((board[i][0] === player) && (board[i][1] === player) && (board[i][2] === player)) {
                return player;
            }
        }
        // Check columns
        for (let j = 0; j < 3; j++) {
            if ((board[0][j] === player) && (board[1][j] === player) && (board[2][j] === player)) {
                return player;
            }
        }
        // Check diagonals
        if (((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) ||
            ((board[0][2] === player) && (board[1][1] === player) && (board[2][0] === player))) {
            return player;
        }
    }

    // Check for a tie
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== '') {
                count++;
            }
        }
    }
    if (count === 9) {
        return "Tie";
    }

    return null;
}