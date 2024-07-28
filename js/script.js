//Variables
const firstInput = document.querySelector('.main__input--first');
const inputs = document.querySelectorAll(".main__input")
//Creating a regular expression to allow only letters (no numbers, symbols) including ñ
const regularExpression = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;

//Create a words array with words of 5 letters
const words = ["gatos", "perro", "libro", "casa", "flor", "piano", "tabla", "niño", "mujer", "ratón", "verde", "llave", "silla", "roble", "tigre", "pared", "pluma", "brazo", "huevo", "lente"];

//Select a random word from the array
const selectedWord = words[Math.floor(Math.random() * words.length)];

//Event listeners
function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        //Focus on the first input
        firstInput.focus();
    })

    //Creating an event listener when the user enters something
    inputs.forEach(input => {
        input.addEventListener("keyup", validateContent);
    });
}

loadEventListeners();

//Function to validate the content
function validateContent(e) {
    const input = e.target;
    const value = input.value;

    //Validate if the key pressed is delete
    if(e.keyCode == 8){
        input.previousElementSibling.focus();
        input.previousElementSibling.value = "";
    }
    //Validate if the key pressed is enter
    else if (e.keyCode == 13) {
        const inputsLine = e.target.parentElement;
        const inputs = inputsLine.querySelectorAll("input");
        //Validate if there are empty inputs
        const emptyInputs = Array.from(inputs).filter(input => input.value === "");

        //If there are empty inputs, show a error animation
        if (emptyInputs.length > 0) {
            emptyInputs.forEach(addErrorAnimation);
        }else{
            //If there are no empty inputs, validate the word
            validateWord(value);
        }
    //Validate if it's a character different to a letter
    }else if (!regularExpression.test(value)) {
        //Reset the input and show a animation
        input.value = "";
        addErrorAnimation(input);
        return;
    }else{
        //Pass the focus to the next input
        input.nextElementSibling.focus();
    }
}

function addErrorAnimation(input) {
    input.classList.add("error");
    setTimeout(() => {
        input.classList.remove("error")
    }, 1000);
}