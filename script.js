/**
 * @file Tic Tac Toe game script
 * @description This script file contains the logic for a Tic Tac Toe game. It handles player turns, game board updates, winner calculation, and UI updates.
 * @version 1.0.0
 */

// DOM elements
const winnerIndicator = document.querySelector('.winner-label');
const playerIndicator = document.querySelector('.player-tag label');
const resetButton = document.querySelector('.reset-button');
const player2 = document.querySelector('.player-2');
const scorePl1 = document.querySelector(".score-pl1");
const scorePl2 = document.querySelector(".score-pl2");
const scoreTie = document.querySelector(".score-tie");
const logoButton = document.querySelector(".logo-button");

// Game state variables
let winState = { winningTiles: [], winner: null };
let tiles = Array.from(document.querySelectorAll('.grid-item'));
let isPlayerTurn = true;
let winnerFound = false;
let isMulti = false;

// Game board
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Score board
const scoreBoard = {
    pl1: 0,
    pl2: 0,
    tie: 0,
};

/**
 * @function updateTurnIndicator
 * @description Updates the player turn indicator on the UI.
 * @param {boolean} isPlayerTurn - Indicates whether it's the player's turn (true) or the AI's turn (false).
 */
const updateTurnIndicator = (isPlayerTurn) => {
    playerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Player ${isPlayerTurn ? 'X' : 'O'}'s turn</span>`;
}

/**
 * @function buttonPressed
 * @description Handles the button click event when a tile is pressed.
 * @param {number} index - The index of the clicked tile.
 */
function buttonPressed(index) {
    let row = Math.floor(index / 3);
    let col = index % 3;

    if (!winnerFound) {
        if (board[row][col] !== '') {
            alert("Choose Another Spot");
        } else {
            makeMove(row, col);
            isPlayerTurn = !isPlayerTurn;
            updateTurnIndicator(isPlayerTurn);
            setTimeout(() => {
                if (!isMulti) {
                    calculateAI();
                }
                let result = getWinner(board);
                updateWinnerFound(result);
                winnerAnimations();
                displayWinner(result);
            }, 1000);
        }
    } else {
        alert("Winner Already Found");
    }
}

/**
 * @function displayWinner
 * @description Displays the winner on the UI and updates the score board.
 * @param {string} result - The result of the game ('X' for player X wins, 'O' for player O wins, 'Tie' for a tie, or null if no winner yet).
 */
function displayWinner(result) {
    if (result === 'X') {
        scoreBoard.pl1++;
        scorePl1.innerHTML = `<span style="font-family:'Share Tech Mono'">${scoreBoard.pl1}</span>`;
        winnerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Winner: X Wins!!</span>`;
    } else if (result === 'O') {
        scoreBoard.pl2++;
        scorePl2.innerHTML = `<span style="font-family:'Share Tech Mono'">${scoreBoard.pl2}</span>`;
        winnerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Winner: O Wins!!</span>`;
    } else if (result === "Tie") {
        scoreBoard.tie++;
        scoreTie.innerHTML = `<span style="font-family:'Share Tech Mono'">${scoreBoard.tie}</span>`;
        winnerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Winner: It's a Tie!</span>`;
    } else {
        winnerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Winner: None</span>`;
    }
}

/**
 * @function updateWinnerFound
 * @description Updates the winnerFound variable based on the game result.
 * @param {string} result - The result of the game ('X' for player X wins, 'O' for player O wins, 'Tie' for a tie, or null if no winner yet).
 */
function updateWinnerFound(result) {
    if (result === 'X' || result === 'O' || result === "Tie") {
        winnerFound = true;
    }
}

/**
 * @function makeMove
 * @description Makes a move on the game board and updates the UI.
 * @param {number} row - The row index of the move.
 * @param {number} col - The column index of the move.
 */
function makeMove(row, col) {
    board[row][col] = isPlayerTurn ? 'X' : 'O';
    const tile = tiles[row * 3 + col];
    const span = document.createElement('span');
    span.style.fontFamily = 'Share Tech Mono';
    span.classList.add("fade-in");
    span.textContent = `${isPlayerTurn ? 'X' : 'O'}`;
    tile.appendChild(span);
}

/**
 * @function getWinner
 * @description Calculates the winner of the game based on the current game board.
 * @param {Array} board - The game board.
 * @returns {string|null} - The winner of the game ('X' for player X wins, 'O' for player O wins, 'Tie' for a tie, or null if no winner yet).
 */
function getWinner(board) {
    const players = ['X', 'O'];

    for (const player of players) {
        for (let i = 0; i < 3; i++) {
            if ((board[i][0] === player) && (board[i][1] === player) && (board[i][2] === player)) {
                winState.winningTiles.push({ i: i, j: 0 });
                winState.winningTiles.push({ i: i, j: 1 });
                winState.winningTiles.push({ i: i, j: 2 });
                winState.winner = player;
                return player;
            }
            for (let j = 0; j < 3; j++) {
                if ((board[0][j] === player) && (board[1][j] === player) && (board[2][j] === player)) {
                    winState.winningTiles.push({ i: 0, j: j });
                    winState.winningTiles.push({ i: 1, j: j });
                    winState.winningTiles.push({ i: 2, j: j });
                    winState.winner = player;
                    return player;
                }
            }
        }

        if (((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) ||
            ((board[0][2] === player) && (board[1][1] === player) && (board[2][0] === player))) {
            if ((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) {
                winState.winningTiles.push({ i: 0, j: 0 });
                winState.winningTiles.push({ i: 1, j: 1 });
                winState.winningTiles.push({ i: 2, j: 2 });
                winState.winner = player;
            } else {
                winState.winningTiles.push({ i: 0, j: 2 });
                winState.winningTiles.push({ i: 1, j: 1 });
                winState.winningTiles.push({ i: 2, j: 0 });
                winState.winner = player;
            }
            return player;
        }
    }

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

/**
 * @function calculateAI
 * @description Calculates the AI's move and makes the move on the game board.
 */
function calculateAI() {
    if (!winnerFound && !isPlayerTurn) {
        let { score, move } = minimax(board, 0, false);
        if (move) {
            makeMove(move.row, move.col);
            isPlayerTurn = true;
            updateTurnIndicator(isPlayerTurn);
        }
    }
}

/**
 * @function winnerAnimations
 * @description Adds animation to the winning tiles on the UI.
 */
function winnerAnimations() {
    if (winnerFound) {
        console.log(winState);
        winState.winningTiles.forEach((piece) => {
            tiles[piece.i * 3 + piece.j].classList.add("blink");
        });
    }
    return;
}

// Event listeners

// Add click event listener to each tile
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => buttonPressed(index));
});

// Add click event listener to logo button
logoButton.onclick = function() {
    isMulti = !isMulti;
    console.log(isMulti);
    if (isMulti) {
        logoButton.innerHTML = `
            <img src="multi.png" alt="Logo" style="display: block; margin: auto;"/>
            <span style="font-family: 'Share Tech Mono'">2P</span>
        `;
        player2.innerHTML = 'Player 2';
    } else {
        logoButton.innerHTML = `
            <img src="single.png" alt="Logo" style="display: block; margin: auto;"/>
            <span style="font-family: 'Share Tech Mono'">1P</span>
        `;
        player2.innerHTML = 'Computer';
    }
    resetButton.click();
    scorePl2.innerHTML = `<span style="font-family:'Share Tech Mono'">0</span>`;
    scorePl1.innerHTML = `<span style="font-family:'Share Tech Mono'">0</span>`;
    scoreTie.innerHTML = `<span style="font-family:'Share Tech Mono'">0</span>`;
    scoreBoard.pl1 = 0;
    scoreBoard.pl2 = 0;
    scoreBoard.tie = 0;
};


// Add click event listener to reset button
resetButton.onclick = function () {
    winnerFound = false;
    isPlayerTurn = true;
    unfilledTiles = 9;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }

    tiles.forEach((tile) => {
        tile.innerHTML = '';
    });

    winState.winningTiles.forEach((piece) => {
        tiles[piece.i * 3 + piece.j].classList.remove("blink");
    });
    winnerIndicator.innerHTML = `<span style="font-family:'Share Tech Mono'">Winner: None</span>`;
    updateTurnIndicator(isPlayerTurn);
};
