/******************/
/*     ONLOAD     */
/******************/

const input = document.querySelector(".display-field");
const btns = document.querySelectorAll(".btn");
let valStr = "";
let total = 0;
let num = 0;
let prevOperator = null;
let isCalculatingDone = false;

window.addEventListener("keydown", eventFunction);
btns.forEach((btn) => {
    btn.addEventListener("click", eventFunction);
});

/*********************/
/*     FUNCTIONS     */
/*********************/

function eventFunction(e) {
    const val = e.target.value || e.key;

    if(!isNaN(val) || val === ".") {
        if (prevOperator == null) total = 0;

        isCalculatingDone = false;
        valStr += val;

        if (isNaN(valStr)) valStr = valStr.substring(0, valStr.length - 1);

        num = Number(valStr);
        input.setAttribute("value", valStr);
    }

    if (val === "Clear") {
        valStr = "";
        total = 0;
        num = 0;
        prevOperator = null;
        isCalculatingDone = false;
        input.setAttribute("value", 0);
    }

    if (val === "Backspace") {
        valStr = valStr.substring(0, valStr.length - 1);
        num = Number(valStr);
        input.setAttribute("value", valStr);
    }

    if (val === "+/-") {
        num *= -1;
        input.setAttribute("value", num);
    }

    if (val === "%") {
        num /= 100;
        input.setAttribute("value", num);
    }

    if (val === "+") total = operate(add, total, num);

    if (val === "-") total = operate(subtract, total, num);

    if (val === "*") total = operate(multiply, total, num);

    if (val === "/") total = operate(divide, total, num);

    if (val === "=") total = operate(null, total, num);
}

function add(currentTotal, currentNum) { return currentTotal + currentNum; }

function subtract(currentTotal, currentNum) { return currentTotal - currentNum; }

function multiply(currentTotal, currentNum) { return currentTotal * currentNum; }

function divide(currentTotal, currentNum) { return currentTotal / currentNum; }

function operate(currentOperator, currentTotal, currentNum) {
    const newTotal = (prevOperator == null || isCalculatingDone) ? currentNum : prevOperator(currentTotal, currentNum);

    prevOperator = currentOperator;
    num = newTotal;
    valStr = "";
    isCalculatingDone = true;
    input.setAttribute("value", newTotal);

    return newTotal;
}