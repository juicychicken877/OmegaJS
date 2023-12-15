const ticTacToe = {
    currentTurn: null,
    currentBoard: [null, null, null, null, null, null, null, null, null],
    roundCount: 0,
    xRound: 0,
    oRound: 0,
    BOARD: document.querySelector('#board'),
    X_HIGHLIGHT: document.querySelector('#x_highlight'),
    O_HIGHLIGHT: document.querySelector('#o_highlight'),
    X_SCORE: document.querySelector('#x_score'),
    O_SCORE: document.querySelector('#o_score'),
    CURTAIN: document.querySelector('#curtain'),
    WINNER: document.querySelector('#winner'),
    END_GAME_CREDITS: document.querySelector('#end_game_credits'),
    ROUND_HEADER: document.querySelector('#round_header'),
    gameStop: false,

    StartGame() {
        this.ClearGame();

        this.CreateBoard();
    }
    ,
    ClearGame() {
        let squares = document.querySelectorAll('.square');

        if (squares)
            for (let i=0; i<squares.length; i++)
                squares[i].remove();

        this.currentBoard = [null, null, null, null, null, null, null, null, null];

        this.CURTAIN.style.display = 'none';
        this.END_GAME_CREDITS.style.display = 'none';

        if (!this.currentTurn)
            this.currentTurn = 'X';

        this.gameStop = false;

        this.ROUND_HEADER.innerHTML = `ROUND ${ this.xRound + this.oRound + 1}`;
    }
    ,
    CheckWin() {
        // win?
        const lines = [
            //horizontal
            [0,1,2],
            [3,4,5],
            [6,7,8],
            //vertical
            [0,3,6],
            [1,4,7],
            [2,5,8],
            //cross
            [0,4,8],
            [2,4,6]
        ]
        //check
        for (let i=0; i<lines.length; i++)
        {
            const [q,w,e] = lines[i];

            if ((this.currentBoard[q] && this.currentBoard[w] && this.currentBoard[e]) &&
            (this.currentBoard[q] === this.currentBoard[w] && this.currentBoard[w] === this.currentBoard[e])
            ) {
                this.gameStop = true;

                if (this.currentTurn === 'X') {
                    this.xRound++;
                    this.X_SCORE.innerHTML = this.xRound.toString();
                    this.WINNER.innerHTML = 'X WINNER!';
                }
                else {
                    this.oRound++;
                    this.O_SCORE.innerHTML = this.oRound.toString();
                    this.WINNER.innerHTML = 'O WINNER!';
                }

                this.CURTAIN.style.display = 'block';
                this.END_GAME_CREDITS.style.display = 'flex';
                    
                this.roundCount = 0;

                break;
            }
        }

        if (this.gameStop == false && this.roundCount >= 9) {
            // draw?
            this.gameStop = true;
            this.WINNER.innerHTML = 'DRAW!';
            
            this.CURTAIN.style.display = 'block';
            this.END_GAME_CREDITS.style.display = 'flex';

            this.roundCount = 0;
        }
    }
    ,
    CreateBoard() {
        for (let i=0; i<9; i++) {
            let BOARD_ELEMENT_CLASS = 'square';
            
            this.currentBoard[i] = null;

            let element = document.createElement('div');
            element.classList.add(BOARD_ELEMENT_CLASS);
            element.dataset.index = i;
            element.addEventListener('click', e => this.OnSquareClick(e));

            this.BOARD.appendChild(element);
        }
    }
    ,
    OnSquareClick(e) {
        if (this.gameStop == false) {
            e.target.innerHTML = this.currentTurn;
            
            this.currentBoard[e.target.dataset.index] = this.currentTurn;

            this.CheckWin();

            if (this.currentTurn == 'X') {
                this.currentTurn = 'O';

                //highlighting
                this.X_HIGHLIGHT.style.opacity = '0'
                this.O_HIGHLIGHT.style.opacity = '1';
            }
            else {
                this.currentTurn = 'X';

                //highlighting
                this.X_HIGHLIGHT.style.opacity = '1';
                this.O_HIGHLIGHT.style.opacity = '0';
            }
            e.target.style.pointerEvents = 'none';

            this.roundCount++;
        }
    }
}

const PreStartGame = () => {
    document.querySelector('#play_again_button').addEventListener('click', () => ticTacToe.StartGame());
    ticTacToe.StartGame();
}

document.addEventListener('onload', PreStartGame());