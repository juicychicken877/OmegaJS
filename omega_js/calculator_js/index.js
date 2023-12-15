String.prototype.removeAt = function(index, charcount) {
    return this.substr(0, index) + this.substr(index + charcount);
  }

const calculatorDisplay = document.getElementById('display');

function AddToDisplay(character) {
    calculatorDisplay.value += character;
}

function ClearDisplay() {
    calculatorDisplay.value = '';
}

function EraseElementFromDisplay() {
    let displayText = calculatorDisplay.value;

    calculatorDisplay.value = displayText.removeAt(displayText.length-1, 1);
}

function Calculate() {
    try {
        calculatorDisplay.value = eval(calculatorDisplay.value);
    }
    catch(error) {
        calculatorDisplay.value = 'ERROR';
    }
}