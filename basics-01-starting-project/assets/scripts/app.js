const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//get input from input field
function getUserInput() {
  return parseInt(userInput.value);
}

//generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor.js
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    //object
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry); //add to array
  console.log(logEntry.operation); //display the operation in obj
  console.log(logEntries); //display the first element of array in console
}

function calculateResult(calculationType) {
  const enteredNumber = getUserInput();
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === "add") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "subtract") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "multiply") {
    currentResult *= enteredNumber;
    mathOperator = "*";
  } else {
    currentResult /= enteredNumber;
    mathOperator = "/";
  }

  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  calculateResult("add");
}

function subtract() {
  calculateResult("subtract");
}

function multiply() {
  calculateResult("multiply");
}

function divide() {
  calculateResult("divide");
}

addBtn.addEventListener("click", add); // when btn is clicked, do add
subtractBtn.addEventListener("click", subtract); // have to be 'click' not 'Click'
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
