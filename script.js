function createPlayer(mark) {

    return { mark };
}

const gameboard = (function () {
    let board = [];

    function placeMark(mark, index) {
        if (!['X', 'O'].includes(mark)) return;
        if (index >= 9) return;

        board[index] = mark;
    }

    function clearBoard() {
        board = [];
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

    return { placeMark, clearBoard, checkWin, getMark, isFull };
})();

const game = (function () {
    let playerTurn = false; //false: Player 1 turn; true: Player 2 turn;
    let isWon = false;
    function playRound() {
        if (!playerTurn) {
            console.log("Player1 Turn");
            gameboard.placeMark(player1.mark,);
        }
    }
    return { playRound };
})();

let player1 = createPlayer("X");
let player2 = createPlayer("O");

game.playRound();