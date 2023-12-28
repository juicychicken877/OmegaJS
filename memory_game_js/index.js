const memoryGame  = {
    howManyCards: 18,
    cardsCheckedCount: 0,
    cards: [],
    cardsChecked: [],
    images: [
        'IMG/BREAKING_BAD/walter_white.png', 'IMG/BREAKING_BAD/jesse_pinkman.png', 'IMG/BREAKING_BAD/marie.png', 
        'IMG/BREAKING_BAD/mike.png', 'IMG/BREAKING_BAD/skyler.png', 'IMG/BREAKING_BAD/hank.png',
        'IMG/BREAKING_BAD/todd.png', 'IMG/BREAKING_BAD/walter_jr.png', 'IMG/BREAKING_BAD/saul.png'
    ],
    cardTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    BOARD: document.querySelector('#board'),
    CURTAIN: document.querySelector('#curtain'),
    canClick: true,

    StartGame()
    {
        this.ClearBoard();

        this.CreateBoard();
    }
    ,
    CheckWin() {
        if (this.cardsCheckedCount == this.howManyCards)
        {
            this.CURTAIN.style.display = 'block';
        }
    }
    ,
    ClearBoard()
    {
        this.cards = [];
        this.cardsChecked = [];
        this.canClick = true;
        this.cardsCheckedCount = 0;

        this.CURTAIN.style.display = 'none';

        cardsHTML = document.querySelectorAll('.card');

        if (cardsHTML)
            for (let i=0; i<cardsHTML.length; i++)
                cardsHTML[i].remove();
    }
    ,
    CreateBoard()
    {
        // set board and randomize 
        for (let i=0; i<this.howManyCards; i++)
        {
            this.cards.push(Math.floor(i/2));
        }
        this.RandomizeBoard();

        // set images by cardtype
        for (let i=0; i<this.cards.length; i++)
        {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('box_shadow');
            card.dataset.index = i;
            card.dataset.cardType = this.cards[i];
            card.onclick = e => this.OnClickCard(e);
            this.BOARD.appendChild(card);
        }
    }
    ,
    RandomizeBoard()
    {
        for (let i=this.cards.length-1; i>0; i--)
        {
            var swapNumber = Math.floor(Math.random()*i);
            var temp = this.cards[i];
            this.cards[i] = this.cards[swapNumber];
            this.cards[swapNumber] = temp;
        }
        // randomize randomized board for better results
        for (let i=this.cards.length-1; i>0; i--)
        {
            var swapNumber = Math.floor(Math.random()*i);
            var temp = this.cards[i];
            this.cards[i] = this.cards[swapNumber];
            this.cards[swapNumber] = temp;
        }
    }
    ,
    OnClickCard(e)
    {
        if (this.canClick == true) 
        {
            // if there is none cards clicked or user just simply clicks another card
            if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== e.target.dataset.index))
            {
                this.cardsChecked.push(e.target);
                
                // change the background
                e.target.style.backgroundImage = `url(${this.images[e.target.dataset.cardType]})`;
            }
            // if clicked 2 cards
            if (this.cardsChecked.length == 2)
            {
                this.canClick = false;
                
                if (this.cardsChecked[0].dataset.cardType == this.cardsChecked[1].dataset.cardType)
                {
                    setTimeout(() => this.DeleteCards(), 600);
                }
                else
                {
                    setTimeout(() => this.ResetCards(), 600);
                }
            }
        }
    }
    ,
    DeleteCards()
    {
        // make unclickable
        this.cardsChecked.forEach(tile => 
            {
                tile.style.pointerEvents = 'none';
            }
        );
        this.canClick = true;
        this.cardsChecked = [];
        this.cardsCheckedCount += 2;

        this.CheckWin();
    }
    ,
    ResetCards()
    {
        this.cardsChecked.forEach(tile => {
            tile.style.backgroundImage = "";
        })

        this.canClick = true;
        this.cardsChecked = [];
    }
}

function PreStart() {
    document.querySelector('#play_again_button').addEventListener('click', () => memoryGame.StartGame());
    memoryGame.StartGame();
}

document.addEventListener("load", PreStart());