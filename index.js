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

//Calculator logic variables
let number1 = [0];
let number2 = [0];
let operated = false;
let currentNumber = 1;
let currentOperation = "";
let calculated = false;

screen.textContent = numberToScreen(number1);

//Add all calculator buttons to DOM
calcButtons.forEach((button) => {
   const newCalcButton = document.createElement("button");

   newCalcButton.classList.add(`button-${button}`);
   newCalcButton.classList.add("item");
   button = button.toUpperCase();
   newCalcButton.textContent = button;

   //Add classes and click events to specific buttons
   switch (button) {
    case "+": case "-": case "X": case "/":
        newCalcButton.classList.add("operation");
        if (button === "X") newCalcButton.textContent = "x";

        //Save current operator
        newCalcButton.addEventListener("click", (ev) => {
            operated = true;
            if (currentOperation === "") currentOperation = button;
            screen.textContent = numberToScreen(number2);
        })

        //Add string class to specific button
        if (button == "+") newCalcButton.classList.add("plus");
        if (button == "-") newCalcButton.classList.add("minus");
        if (button == "/") newCalcButton.classList.add("division");

        break;
    
    case "=":
        newCalcButton.classList.add("operation");
        newCalcButton.classList.add("equal");
        newCalcButton.addEventListener("click", (ev) => {
            calculate();
        })
        break;

    case "AC":
        newCalcButton.classList.add("clear");
        newCalcButton.addEventListener("click", (ev) => {
            clear();
        })
        break;
    
    case ".":
        newCalcButton.addEventListener("click", (ev) => {
            addButtonnumberToScreenNumber(newCalcButton);
        })
        break;

    default:
        newCalcButton.addEventListener("click", (ev) => {
            useNumberButton(newCalcButton);
        });
        break;
   }

   calcGrid.appendChild(newCalcButton);
});

//Event Listeners for keyboard
window.addEventListener("keydown", (ev) => {
    let key = ev.key;
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let operators = ["+", "-", "x", "/", "=", "Enter", "Escape"];
    let targetButton;
    if (numbers.includes(+key) || operators.includes(key)) {
        if (numbers.includes(+key)) {
            targetButton = document.querySelector(`.button-${key}`);
        };
        if (operators.includes(key)) {
            if (key == "+") targetButton = document.querySelector(".plus");
            if (key == "-") targetButton = document.querySelector(".minus");
            if (key == "/") targetButton = document.querySelector(".division");
            if (key == "=" || key =="Enter") targetButton = document.querySelector(".equal");
            if (key == "Escape") targetButton = document.querySelector(".clear");
        }

        targetButton.click();
    }

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

function useNumberButton(button) {
    if (calculated == true) {
        operated = false;
        calculated = false;
        currentOperation = "";
        number1 = [0];
        number2 = [0];
    }
    addButtonnumberToScreenNumber(button);
}

function numberToScreen(numberArr) {
    let screenNumber = "";

    numberArr.forEach((numb) => {
        screenNumber += `${numb}`;
    });
   
    return screenNumber;
}

function addButtonnumberToScreenNumber (button) {
    if (!operated) {
        if (number1[0] == 0 && number1.length == 1) number1.shift();
        number1.push(button.textContent);
        number1.length < screenLength ? screen.textContent = numberToScreen(number1) : screen.textContent = screen.textContent;
    }

    if (operated) {
        if (number2[0] == 0 && number2.length == 1) number2.shift();
        number2.push(button.textContent);
        number2.length < screenLength ? screen.textContent = numberToScreen(number2) : screen.textContent = screen.textContent;
    }
}

function clear() {
    number1 = [0];
    number2 = [0];
    operated = false;
    currentOperation = "";
    screen.textContent = numberToScreen(number1);
}

function calculate() {
    if (currentOperation != undefined && currentOperation != "") {
        console.log("I am calculating");
        console.log(currentOperation);
        let num1;
        let num2;
        if (calculated != true) {
            num1 = numberToScreen(number1);
            num2 = numberToScreen(number2);
            num1 = +num1;
            num2 = +num2;
            calculated = true;
        }
        else {
            num1 = number1;
            num2 = number2;
        }

        let result;
        if (currentOperation === "+") result = add(num1, num2);
        if (currentOperation === "-") result = subtract(num1, num2);
        if (currentOperation === "X") result = multiply(num1, num2);
        if (currentOperation === "/") result = divide(num1, num2);  
        
        result = (Math.round((result * 10000))) / 10000;
        screen.textContent = result;
        number1 = result;
        number2 = num2;

    };
}