// let input = document.getElementById('inputBox');
// let buttons = document.querySelectorAll('.buttons');

// let string = "";
// let arr = Array.from(buttons);
// arr.forEach(button => {
//     button.addEventListener("click", (e) => {
//         if (e.target.innerHTML == "=" ) {
//             string = eval(string);
//             input.value = string;
//         } else if (e.target.innerHTML == "AC") {
//             string = "";
//             input.value = string;
//         } else if (e.target.innerHTML == "DEL") {
//             string = string.substring(0, string.length-1);
//             input.value = string;
//         } else {
//             string += e.target.innerHTML;
//             input.value = string;
//         }
//     })
// })



const resultElement = document.getElementById("input-box");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");
const divideBtn = document.getElementById("divide-btn");
const multiBtn = document.getElementById("multi-btn");
const subBtn = document.getElementById("sub-btn");
const addBtn = document.getElementById("add-btn");
const decimalBtn = document.getElementById("decimal-btn");
const equalBtn = document.getElementById("equal-btn");
const percentBtn = document.getElementById("percent");
const numbButtons = document.querySelectorAll(".numb-buttons");

let result = "";
let operation = "";
let prevOperand = 0;

const appendNumber = (number) => {
    if (number === "." && result.includes(".")){
        return;
    }
    result += number;
    updateDisplay();
}


const updateDisplay = () => {
    if (operation){
        resultElement.value = `${prevOperand} ${operation} ${result}`;
    } else {
        resultElement.value = result;
    }

    resultElement.scrollLeft = resultElement.scrollWidth;
}

const selectOperator = (operatorValue) => {
    if (result === "") {
        return;
    }

    if (operation !== "" && prevOperand !== "") {
        calculateResult();
    }

    operation = operatorValue;
    prevOperand = result;
    result = "";
    updateDisplay();
}


const calculateResult = () => {
    let evalResult;
    const prev = parseFloat(prevOperand);
    const current = parseFloat(result);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operation) {
        case "+":
            evalResult = prev + current;
            break;
        case "-":
            evalResult = prev - current;
            break;
        case "*":
            evalResult = prev * current;
            break;
        case "/":
            if (current === 0) {
                alert("Division by Zero")
            }
            evalResult = prev / current;
            break;
        default:
            return;
    }

    result = evalResult.toString();
    operation = "";
    prevOperand = "";

    updateDisplay();

}


numbButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    })
})

const clearDisplay = () => {
    result = "";
    operation = "";
    prevOperand = "";
    updateDisplay();
}

// const deleteLastBtn = () => {
//     if (result === 0) {
//         return;
//     } result = result.slice(0, -1);
//     operation = operation.slice(0, 0);
//     updateDisplay();
// }


const deleteLastBtn = () => {
    if (operation !== "" && result === "") {
      operation = "";
      result = prevOperand;
      prevOperand = "";
      updateDisplay();
    } else {
      result = result.slice(0, -1);
      updateDisplay();
    }
  };


decimalBtn.addEventListener("click", () => appendNumber("."));
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastBtn);
addBtn.addEventListener("click", () => selectOperator("+"));
subBtn.addEventListener("click" , () => selectOperator("-"));
multiBtn.addEventListener("click", () => selectOperator("*"));
divideBtn.addEventListener("click", () => selectOperator("/"));
percentBtn.addEventListener("click", () => {
    result = (result/100);
    updateDisplay();
})
equalBtn.addEventListener("click", () => {
    if (result === "") {
        return;
    }
    calculateResult();
    updateDisplay();
});