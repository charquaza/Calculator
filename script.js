"use strict";

(function startCalculator() {
    var operand1 = "";
    var operand2 = "";
    var operator = "";

    function operate(operator, x, y) {
        var x = parseFloat(x);
        var y = parseFloat(y);

        switch (operator) {
            case "+":
                return String(x + y);
            case "-":
                return String(x - y);
            case "*":
                return String(x * y);
            case "/":
                if (y === 0) {
                    return "error";
                }
                return String(x / y);
        }
    }
    
    function handleNumberInput(click) {
        var numberInput = click.target.innerText;
        
        if (!operator) {
            //operand1: don't display leading zeros
            if (operand1 === "0") {
                if (numberInput !== "0") {
                    operand1 = numberInput;
                }
            } else {
                operand1 += numberInput;
            }
        } else {
            //operand2: if set to 0, freeze value
            if (operand2 !== "0") {
                operand2 += numberInput;
            }
        }

        renderDisplay();
    }

    function handleOperatorInput(click) {
        var operatorInput = click.target.innerText;

        if (operator && operand2) {
            let result = operate(operator, operand1, operand2);

            if (result === "error") {
                clearState();
                renderDisplay(true);
            } else {
                operand1 = result;
                operand2 = "";
                operator = (operatorInput === "=") ? "" : operatorInput;
                renderDisplay();
            }
        } else if (operand1 && !operator) {
            if (operatorInput !== "=") {
                operator = operatorInput;
            }
        } else if (operand1 && operator) {
            clearState();
            renderDisplay(true);
        }
    }

    function clearState() {
        operand1 = "";
        operand2 = "";
        operator = "";
        renderDisplay();
    }

    function renderDisplay(error) {
        var display = document.querySelector(".display");

        if (error) {
            display.textContent = "error";
        } else if (operand2) {
            display.textContent = operand2;
        } else {
            display.textContent = operand1;
        }
    }

    (function setListeners() {
        var numberButtons = document.querySelectorAll(".numbers button");
        var operatorButtons = document.querySelectorAll(".operators button");
        var clearButton = document.querySelector(".clear button");

        numberButtons.forEach(function addListener(button) {
            button.addEventListener("click", handleNumberInput);
        });
        operatorButtons.forEach(function addListener(button) {
            button.addEventListener("click", handleOperatorInput);
        });
        clearButton.addEventListener("click", clearState);
    })();

})();
