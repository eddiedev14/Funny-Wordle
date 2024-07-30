//Variables
const firstInput = document.querySelector('.main__input--first');
const inputs = document.querySelectorAll(".main__input");
const keys = document.querySelectorAll(".keyboard__key");
//Creating a regular expression to allow only letters (no numbers, symbols) including ñ
const regularExpression = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;

//Crea un array de palabras con 5 letras que no se repitan caracteres



const words = ["gatos", "perro", "libro", "casas", "milla", "piano", "tabla", "niños", "mujer", "ratón", "verde", "llave", "silla", "roble", "tigre", "pared", "pluma", "brazo", "huevo", "lente"];

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
        input.addEventListener("keyup", validateContentByKey);
        input.addEventListener("focus", modifySelectedDataset);
    });

    //Creating an event listener when the user clicks in some button
    keys.forEach(key => {
        key.addEventListener("click", validateContentByClick);
    });
}

loadEventListeners();

//Function to validate the content when the user press a key from his keyboard
function validateContentByKey(e) {
    const input = e.target;

    //Validate if the key pressed is tab
    if (e.keyCode == 9) { return; }
    //Validate if the key pressed is delete
    else if(e.keyCode == 8){ deleteCharacter(input); }
    //Validate if the key pressed is enter
    else if (e.keyCode == 13) { sendWord(input); }
    //Validate if it's a character different to a letter
    else if (!regularExpression.test(input.value)) { showCharacterError(input); return; }
    //Pass the focus to the next input
    else{ 
        //If there is no next input, it returns the function
        if (!input.nextElementSibling) { return; }
        input.nextElementSibling.focus(); 
    }
}

//Function to validate the content when the user clicks a key from our own keyboard
function validateContentByClick(e) {
    const btn = e.target.nodeName === "I" ? e.target.parentElement : e.target;
    const input = document.querySelector('.main__input[data-selected="true"]');

    //Validate if the btn pressed has the class "keyboard__key--delete"
    if (btn.classList.contains("keyboard__key--delete")){ deleteCharacter(input); }
    //Validate if the btn pressed has the class "keyboard__key--send"
    else if (btn.classList.contains("keyboard__key--send")) { sendWord(input); }
    //Pass the focus to the next input
    else { 
        input.value = btn.innerText;
        //If there is no next input, it returns the function
        if (!input.nextElementSibling) { return; }
        input.nextElementSibling.focus();
     }
}

//Function to delete a character from an input
function deleteCharacter(input) {
    //If there is no previous input, it returns the function
    if (!input.previousElementSibling) { return; }

    input.previousElementSibling.focus();
    input.previousElementSibling.value = "";
}

//Function to send word to validation
function sendWord(input){
    const inputsLine = input.parentElement;
    const inputs = inputsLine.querySelectorAll("input");
    //Validate if there are empty inputs
    const emptyInputs = Array.from(inputs).filter(input => input.value === "");

    //If there are empty inputs, show a error animation
    if (emptyInputs.length > 0) {
        emptyInputs.forEach(addErrorAnimation);
    }else{
        //If there are no empty inputs, validate the word
        validateWord(inputsLine, inputs);
    }
}

//Function to show an error in a specific input
function showCharacterError(input){
    input.value = "";
    addErrorAnimation(input);
}

//Function to change the dataset automatically when the input is focus
function modifySelectedDataset(e) {
    document.querySelector(".main__input[data-selected='true']").removeAttribute("data-selected");
    e.target.dataset.selected = true;
}

//Function to set an animation to the input
function addErrorAnimation(input) {
    input.classList.add("error");
    setTimeout(() => {
        input.classList.remove("error")
    }, 1000);
}

//Function to validate the input value with the selected word
function validateWord(inputLine, inputs) {

        // Crear un objeto para contar las ocurrencias de cada letra en la palabra seleccionada
    const letterCount = {};
    //Va añadiendo a el objeto cada letra con el valor de su cantidad. Si es la primera vez se coloca 0 sino se suma 1
    for (let char of selectedWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // Primera pasada: marcar las letras en la posición correcta
    for (let i = 0; i < selectedWord.length; i++) {
        const input = inputs[i];
        const char = input.value.toLowerCase();
        
        if (selectedWord[i] === char) {
            input.classList.add("main__input--success");
            document.querySelector(".keyboard__key[data-letter='" + char + "']").classList.add("keyboard__key--success");
            letterCount[char]--;
        }
    }

    // Segunda pasada: marcar las letras en la posición incorrecta o no encontradas
    for (let i = 0; i < selectedWord.length; i++) {
        const input = inputs[i];
        const char = input.value.toLowerCase();
        
        if (selectedWord[i] !== char) {
            if (letterCount[char] > 0) {
                input.classList.add("main__input--close");
                document.querySelector(".keyboard__key[data-letter='" + char + "']").classList.add("keyboard__key--close");
                letterCount[char]--;
            } else {
                input.classList.add("main__input--not-found");
                document.querySelector(".keyboard__key[data-letter='" + char + "']").classList.add("keyboard__key--not-found");
            }
        }
        
        input.disabled = true;
    }


    //Preparing the form to pass to the next line
    const nextInputsLine = inputLine.nextElementSibling;
    nextInputsLine.querySelectorAll("input").forEach(input => {
        input.removeAttribute("disabled");
    });
    nextInputsLine.firstElementChild.focus();
}

console.log(selectedWord)