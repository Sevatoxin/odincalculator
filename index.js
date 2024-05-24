// Pseudocode:
// - Create a Calculator
// - Create a function for every basic calculator evaluation
//     -> ADD / SUBSTRACT / MULTIPLY / DIVIDE
// - Create a Button that clears the calc screen
// - Create an operator function that takes 2 numbers and the operator as arguments
// - In HTML each number 0 to 10 and the operator each have a button as have the clear and result button
// - Let the numbers be on screen when click in a number button
// - Numbers appear always on the right to build a bigger number

//Define all DOM elements
const calcGrid = document.querySelector(".grid");
const calcButtons = ["ac", "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "x", "0", ".", "=", "/"]
const screen = document.querySelector(".screen");
const screenLength = 12;

//Calculator logic
let number1 = [0];
let number2 = [0];
let operated = false;
let currentNumber = 1;

screen.textContent = numberToScreen(number1);

//Add all calculator buttons to DOM
calcButtons.forEach((button) => {
   const newCalcButton = document.createElement("button");

   newCalcButton.classList.add(`button-${button}`);
   newCalcButton.classList.add("item");
   button = button.toUpperCase();
   newCalcButton.textContent = button;

   switch (button) {
    case "+": case "-": case "X": case "/": case "=":
        newCalcButton.classList.add("operation");
        if (button === "X") newCalcButton.textContent = "x";
        break;

    case "AC":
        newCalcButton.classList.add("clear");
        newCalcButton.addEventListener("click", (ev) => {
            clearScreen();
        })
        break;
    
    case ".":
        break;

    default:
        newCalcButton.addEventListener("click", (ev) => {
            addButtonNumberToScreen(newCalcButton);
        });
        break;
   }

   calcGrid.appendChild(newCalcButton);
});

//Event Listeners for keyboard
window.addEventListener("keydown", (ev) => {
    console.log(ev);
})

//Functions
function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    return (num1 / num2);
}

function operate(num1, num2, operation) {
    return;
}

function numberToScreen(numberArr) {
    let screenNumber = "";

    numberArr.forEach((numb) => {
        screenNumber += `${numb}`;
    });
   
    return screenNumber;
}

function addButtonNumberToScreen (button) {
    if (number1[0] == 0) number1.shift();
    number1.push(Number(button.textContent));
    number1.length < screenLength ? screen.textContent = numberToScreen(number1) : screen.textContent = screen.textContent;
}

function clearScreen() {
    number1 = [0];
    number2 = [0];
    operated = false;
    screen.textContent = numberToScreen(number1);
}