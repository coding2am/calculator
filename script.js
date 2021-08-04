/* script */
"use strict";

/* tags */

const screenTag = document.querySelector(".screen");
const calcBtnTag = document.querySelectorAll(".calc-btn");

/* decleartion */

let runningTotal = 0;
let buffer = "0";
let previousOperator;

/* functions */

const flushOperation = (intBuffer) => {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
};

const handleMathOperator = (operator) => {
  if (buffer === "0") {
    //nothing
    return;
  }
  const intBuffer = +buffer;
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = operator;
  buffer = "0";
};

const buttonClick = (value) => {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screenTag.innerText = buffer.toString().substring(0, 10);
};

const handleSymbol = (symbol) => {
  switch (symbol) {
    case "AC":
      buffer = "0";
      runningTotal = 0;
      break;

    case "←":
      const stringBuffer = buffer.toString();
      if (stringBuffer.length === 1) {
        buffer = "0";
      } else {
        buffer = stringBuffer.substring(0, stringBuffer.length - 1);
      }
      break;

    case ".":
      if (buffer.includes(".")) {
        return;
      }
      buffer += ".";
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(+buffer);
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;

    case "×":
    case "−":
    case "+":
    case "÷":
      handleMathOperator(symbol);
      break;
  }
};

const handleNumber = (numberString) => {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer = buffer + numberString;
  }
};

const init = () => {
  calcBtnTag.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttonClick(e.target.innerText);
    });
  });
};

init();
