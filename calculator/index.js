let start_count = 0;
let display = document.querySelector(".display");
let start = document.querySelector("#clear");
let values = { operand1: null, operand2: null, operator: null, result: null };
let currentOperand = ""; // Temporary variable to store ongoing input

// To start the calculator
start.addEventListener("click", function () {
  if (start_count == 0) {
    display.textContent = "starting...";
    setTimeout(() => (display.textContent = "0"), 1000);
  } else {
    display.textContent = "clearing...";
    setTimeout(() => (display.textContent = "0"), 1000);
    console.log("Display Cleared");
  }
  start_count += 1;
  values.operand1 = null;
  values.operand2 = null;
  values.operator = null;
  values.result = null;
  currentOperand = "";

  console.log("Calculator Started");
});

// To get operand inputs
let operand_box = document.querySelector(".operands");
const operand_button = operand_box.querySelectorAll("button");
operand_button.forEach((button) => {
  button.addEventListener("click", () => {
    let str = button.id;
    if (str.startsWith("num")) {
      currentOperand += str.slice(3); // Append the digit
      display.textContent = currentOperand;
      console.log(`Current input: ${currentOperand}`);
    }
  });
});

// To assign operand1 or operand2 and handle operators
let operator_box = document.querySelector(".operators");
const operator_button = operator_box.querySelectorAll("button");
operator_button.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      // Clear all values
      values.operator = null;
      currentOperand = "";
      values.operand1 = null;
      values.operand2 = null;
      display.textContent = "0";
    } else if (button.id === "equals") {
      // Calculate the result
      if (currentOperand !== "") {
        values.operand2 = Number(currentOperand); // Assign operand2
      }
      calculator();
      console.log("Calculations have started");
      currentOperand = ""; // Reset currentOperand after calculation
    } else if (button.id === "reverse-sign") {
      // Reverse the sign of the current operand
      if (currentOperand !== "") {
        currentOperand = String(-Number(currentOperand));
        display.textContent = currentOperand;
      } else if (values.operand1 !== null && values.operator === null) {
        values.operand1 *= -1;
        display.textContent = values.operand1;
      } else if (values.operand2 !== null) {
        values.operand2 *= -1;
        display.textContent = values.operand2;
      }
      console.log("Reversed sign applied");
    } else if (button.id === "modulus") {
      // Apply modulus to the current operand
      if (currentOperand !== "") {
        currentOperand = String(Number(currentOperand) * 0.01);
        display.textContent = currentOperand;
      } else if (values.operand1 !== null && values.operator === null) {
        values.operand1 *= 0.01;
        display.textContent = values.operand1;
      } else if (values.operand2 !== null) {
        values.operand2 *= 0.01;
        display.textContent = values.operand2;
      }
      console.log("Modulus applied");
    } else {
      // Handle regular operators
      if (values.operand1 === null && currentOperand !== "") {
        values.operand1 = Number(currentOperand); // Assign operand1
        currentOperand = ""; // Reset for the next input
      }
      values.operator = button.id;
      console.log(`Operator chosen is ${values.operator}`);
      display.textContent = `${values.operand1} ${values.operator}`;
    }
  });
});

// Calculator
function calculator() {
  if (values.operand1 !== null && values.operand2 !== null) {
    switch (values.operator) {
      case "plus":
        values.result = values.operand1 + values.operand2;
        break;
      case "minus":
        values.result = values.operand1 - values.operand2;
        break;
      case "multiply":
        values.result = values.operand1 * values.operand2;
        break;
      case "divide":
        values.result = values.operand1 / values.operand2;
        break;
      default:
        values.result = values.operand1; // No operation performed
    }
    display.textContent = `${values.result}`;
    console.log(`Result: ${values.result}`);
    values.operand1 = values.result; // Store result for further operations
    values.operand2 = null; // Reset operand2
    values.operator = null; // Reset operator
  } else {
    display.textContent = "Error";
    console.log("Error: Insufficient operands");
  }
}
