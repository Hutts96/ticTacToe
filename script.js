function createPlayer(mark) {

    return { mark };
}

const gameboard = (function () {
    let board = [];

    function placeMark(mark, index) {
        if (!['X', 'O'].includes(mark)) return;
        if (index >= 9) return;
        if (board[index] != undefined) return;

        board[index] = mark;
        updateBoard();
        return true;
    }

    function updateBoard() {
        for (let i = 0; i < 9; i++) {
            switch (board[i]) {
                case "X":
                    xMarks.item(i).style.display = "block";
                    break;
                case "O":
                    oMarks.item(i).style.display = "block";
                    break;
                case undefined:
                    xMarks.item(i).style.display = "none";
                    oMarks.item(i).style.display = "none";
                    break;
            }
        }
    }

    function clearBoard() {
        board = [];
        updateBoard();
    }

    function getMark(index) {
        if (index >= 9) return;

        return board[index];
    }

    function isFull() {
        for (let i = 0; i < 9; i++)
            if (board[i] == undefined)
                return false;
        return true;
    }

    function checkWin() {
        for (let i = 0; i < 3; i++) {
            if (board[i] === board[i + 3] && board[i] === board[i + 6] && board[i] !== undefined) {
                return { win: true, mark: board[i] };
            }
        }

        for (let i = 0; i < 7; i += 3) {
            if (board[i] === board[i + 1] && board[i] === board[i + 2] && board[i] !== undefined) {
                return { win: true, mark: board[i] };
            }
        }

        if (board[0] === board[4] && board[0] === board[8] && board[0] !== undefined) {
            return { win: true, mark: board[0] };
        }

        if (board[2] === board[4] && board[2] === board[6] && board[2] !== undefined) {
            return { win: true, mark: board[2] };
        }

        return { win: false, mark: null };
    }

    function isTie() {
        if (isFull() && !checkWin().win) return true;
        return false;
    }

    return { placeMark, clearBoard, checkWin, getMark, isTie };
})();

const game = (function () {
    let playerTurn = false; //false: Player 1 turn; true: Player 2 turn;

    let player1 = createPlayer("X");
    let player2 = createPlayer("O");

    function playRound(index) {
        if (!playerTurn) {
            playerTurnBanner.textContent = "O's turn";
            gameboard.placeMark(player1.mark, index);

        } else {

            playerTurnBanner.textContent = "X's turn";
            gameboard.placeMark(player2.mark, index);
        }
        playerTurn = !playerTurn;
        if (gameboard.isTie()) {
            playerTurnBanner.textContent = "It's a tie";
            return 0;
        } else if (gameboard.checkWin().win) {
            let winner = [player1, player2].find(player => gameboard.checkWin().mark === player.mark);
            playerTurnBanner.textContent = `${winner.mark} wins!`
            return 1;
        } else {
            return null;
        }
    }

    function reset() {
        gameboard.clearBoard();
        playerTurn = false;
        state = null;
        playerTurnBanner.textContent = "X's turn";
    }

    return { playRound, reset };
})();

const playerTurnBanner = document.querySelector(".player-turn");
const xMarks = document.querySelectorAll(".x");
const oMarks = document.querySelectorAll(".o");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");

let state = null

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        if (gameboard.getMark(e.target.id) === undefined) {
            console.log(e.target.id);
            if (state === null)
                state = game.playRound(e.target.id);
        }
    });
});

resetButton.addEventListener("click", () => { game.reset() });


