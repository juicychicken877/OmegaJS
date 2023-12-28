String.prototype.ChangeChar = function(position, letter) 
{
    if (position > this.length-1) 
        return this.toString();
    else
        return (this.substring(0, position) + letter + this.substring(position+1)); 
}

const hangmanImageObject = {
    hangmanImagesCount: 8,
    hangmanImagesArray: [],
    hangmanImageBlock: document.querySelector('#hangman_stage'),

    AddImages() {
        for(let i=0; i<=this.hangmanImagesCount; i++)
        {
            path = `IMG/HANGMAN/${ i }.png`;
            this.hangmanImagesArray.push(path);
        }
    }
    ,
    SetHangmanImage(index) {
        this.hangmanImageBlock.innerHTML = `<img src="${this.hangmanImagesArray[index]}">`;
    }
}

const hangmanGame = {
    word: null,
    encryptedWord: null,
    mistakes: 0,
    BACKGROUND_WON: 'rgba(57, 163, 49, 0.9)',
    BACKGROUND_LOST: 'rgba(235, 57, 45, 0.9)',
    WORD_BOX: document.querySelector('#word_box'),
    GAME_KEYBOARD: document.querySelector('#game_keyboard'),
    GAME_RESULT: document.querySelector('#game_result'),
    PLAY_AGAIN_BUTTON: document.querySelector('#play_again_button'),
    END_GAME_CREDITS: document.querySelector('#end_game_credits'),
    words: ['FOOTBALL', 'BASKETBALL', 'VOLEYBALL', 'KEYBOARD', 'PRINTER', 'SMARTPHONE', 'LAPTOP', 'PROCESSOR'],

    StartGame() {
        this.word = this.GetRandomWord();
        this.encryptedWord = this.EncryptWord(this.word);

        this.UpdateWordBoxText();
    }
    ,
    RestartGame() {
        this.ClearGame();
        this.PrepareKeyboard();
        this.StartGame();
    }
    ,
    ClearGame() {
        this.GAME_KEYBOARD.innerHTML = '';
        this.GAME_KEYBOARD.style.pointerEvents = 'auto';
        this.END_GAME_CREDITS.style.display = 'none';
        //this.END_GAME_CREDITS.style.display = 'none';
        this.mistakes = 0;
        hangmanImageObject.SetHangmanImage(this.mistakes);
        this.word = null;
        this.encryptedWord = null;
    }
    ,
    CheckWin() {
        // if won disable keyboard WON
        if (this.encryptedWord === this.word) {
            this.GAME_KEYBOARD.style.pointerEvents = 'none';
            this.GAME_RESULT.innerHTML = 'YOU WON!';
            this.END_GAME_CREDITS.style.backgroundColor = this.BACKGROUND_WON;
            this.END_GAME_CREDITS.style.display = 'block';
        }
        // the hangman has hanged LOST
        else if (this.mistakes >= hangmanImageObject.hangmanImagesCount) {
            this.GAME_KEYBOARD.style.pointerEvents = 'none';
            this.GAME_RESULT.innerHTML = 'YOU LOST!';
            this.END_GAME_CREDITS.style.backgroundColor = this.BACKGROUND_LOST;
            this.END_GAME_CREDITS.style.display = 'block';
        }
    }
    ,
    UpdateWordBoxText() {
        this.WORD_BOX.textContent = this.encryptedWord;
    }
    ,
    PrepareKeyboard() {
        // class name of key in game keyboard
        className = 'key';

        // english alphabet has 26 letters
        for (let i=0; i<26; i++) {   
            // 'A' + i for example 'A' + 25 = 'Z'
            code = String.fromCharCode("A".charCodeAt(0) + i);

            element = document.createElement('div');
            element.classList.add(className);
            element.innerHTML = code
            element.dataset.character = code;
            element.addEventListener('click', e => this.OnClickKey(e));

            this.GAME_KEYBOARD.appendChild(element);
        }
    }
    ,
    ChangeKeyRed(key) {
        key = key.target;

        key.style.border = '4px solid rgb(235, 57, 45)';
        key.style.color = 'rgb(235, 57, 45)';
        key.style.pointerEvents = 'none';
    }
    ,
    ChangeKeyGreen(key) {
        key = key.target;

        key.style.border = '4px solid rgb(57, 163, 49)';
        key.style.color = 'rgb(57, 163, 49)'
        key.style.pointerEvents = 'none';
    }
    ,
    OnClickKey(key) {
        character = key.target.dataset.character;
        found = false;

        for (let i=0; i<this.word.length; i++) {
            if (this.encryptedWord.charAt(i) == '_' && this.word.charAt(i) == character) {
                this.encryptedWord = this.encryptedWord.ChangeChar(i, character);
                found = true;
            }
        }
        switch(found) {
            case false: 
                this.ChangeKeyRed(key);
                this.mistakes += 1;
                hangmanImageObject.SetHangmanImage(this.mistakes);
            break;
            case true: 
                this.ChangeKeyGreen(key);
            break;
        }
        this.UpdateWordBoxText();

        this.CheckWin();
    }
    ,
    GetRandomWord() {
        wordsSize = this.words.length;
        index = Math.floor(Math.random()*wordsSize)

        return this.words[index];
    }
    ,
    EncryptWord(word) {
        notEncrypted = 2;
        newWord = '';

        for (let i=0; i<word.length; i++) {
            if (word[i] != ' ')
                newWord += '_';
        }

        return newWord;
    }
    
}

function PreBuildGame() {
    hangmanImageObject.AddImages();
    hangmanGame.RestartGame();
    document.querySelector('#play_again_button').addEventListener('click', () => hangmanGame.RestartGame());
}

document.addEventListener('onload', PreBuildGame());