import "./style.css";

function startup() {
  const numberBtns = document.getElementsByClassName("number");
  const calculation = document.getElementById("calculation");
  const result = document.getElementById("result");
  const clearBtn = document.getElementById("clear");
  const calculateBtn = document.getElementById("calculate");
  let calculationString = "";

  for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].onclick = function () {
      if (
        (calculationString == "" ||
          calculationString == "+" ||
          calculationString == "-" ||
          calculationString == "×" ||
          calculationString == "÷") &&
        (numberBtns[i].innerHTML == "×" || numberBtns[i].innerHTML == "÷")
      ) {
        return;
      }

      if (
        (calculationString.charAt(calculationString.length - 1) == "+" ||
          calculationString.charAt(calculationString.length - 1) == "-" ||
          calculationString.charAt(calculationString.length - 1) == "×" ||
          calculationString.charAt(calculationString.length - 1) == "÷") &&
        (numberBtns[i].innerHTML == "+" ||
          numberBtns[i].innerHTML == "-" ||
          numberBtns[i].innerHTML == "×" ||
          numberBtns[i].innerHTML == "÷")
      ) {
        calculationString = calculationString.slice(0, -1);
        calculationString += numberBtns[i].innerHTML;
        calculation.innerHTML = calculationString;
        return;
      }
      if (
        result.innerHTML != "" &&
        numberBtns[i].innerHTML != "+" &&
        numberBtns[i].innerHTML != "-" &&
        numberBtns[i].innerHTML != "×" &&
        numberBtns[i].innerHTML != "÷"
      ) {
        clear();
      }

      if (
        result.innerHTML != "" &&
        (numberBtns[i].innerHTML == "+" ||
          numberBtns[i].innerHTML == "-" ||
          numberBtns[i].innerHTML == "×" ||
          numberBtns[i].innerHTML == "÷")
      ) {
        calculationString = result.innerHTML + numberBtns[i].innerHTML;
        calculation.innerHTML = calculationString;
        result.innerHTML = "";
        return;
      }
      calculationString += numberBtns[i].innerHTML;
      calculation.innerHTML = calculationString;
    };
  }

  calculateBtn.onclick = function () {
    let stringToCalculate = calculationString
      .replace("×", "*")
      .replace("÷", "/");

    let calculationResult = parse(stringToCalculate);

    result.innerHTML = calculationResult;
  };

  clearBtn.onclick = clear;

  function clear() {
    calculationString = "";
    result.innerHTML = "";
    calculation.innerHTML = "";
  }
}

function parse(str) {
  if (!str) {
    return "";
  }
  return Function(`'use strict'; return (${str})`)();
}

window.onload = startup;
