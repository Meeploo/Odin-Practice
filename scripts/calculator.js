console.log("fuck")

const OPERATORS = ['+','-','*','/'];

const linePrevious = document.querySelector("#previousOperation");
const resultPrevious = document.querySelector("#previousResult");

const operands = {
    adderFirst: document.querySelector("#adderFirst"),
    operator: document.querySelector("#operator"),
    adderSecond: document.querySelector("#adderSecond")
}

function clearCalculator(){
    if (operands.adderSecond.innerHTML == "" && operands.operator.innerHTML == "" && operands.adderSecond.innerHTML == ""){
        linePrevious.innerHTML = "";
        resultPrevious.innerHTML = "";
    }
    operands.adderFirst.innerHTML = "";
    operands.adderSecond.innerHTML = "";
    operands.operator.innerHTML = "";
}

function evalCalculator(){
    linePrevious.innerHTML = Object.keys(operands).reduce((accumulator, currentValue) => accumulator.concat(operands[currentValue].innerHTML.concat(" ")),"").concat("=");
    const floatA = parseFloat(operands.adderFirst.innerHTML);
    const floatB = parseFloat(operands.adderSecond.innerHTML);
    switch (operands.operator.innerHTML) {
        case "/":
            resultPrevious.innerHTML = floatA/floatB;
            break;
        case "*":
            resultPrevious.innerHTML = floatA*floatB;
            break;
        case "+":
            resultPrevious.innerHTML = floatA+floatB;
            break;
        case "-":
            resultPrevious.innerHTML = floatA-floatB;
            break;
        default:
            break;
    }
    clearCalculator();
}

function handleButtonPress(operandIn) {
    if (operandIn == "C"){
        clearCalculator();
    }
    else if (operandIn == "="){
        evalCalculator();
    }
    else if (OPERATORS.includes(operandIn)){
        if (operands.adderSecond.innerHTML != ""){
            operands.adderFirst.innerHTML = operands.adderSecond.innerHTML;
            operands.adderSecond.innerHTML = "";
            operands.operator.innerHTML = operandIn;
        }
        else if (resultPrevious.innerHTML != ""){
            operands.adderFirst.innerHTML = resultPrevious.innerHTML;
            operands.operator.innerHTML = operandIn;
        }
    }
    else {
        operands.adderSecond.innerHTML = operands.adderSecond.innerHTML.concat(operandIn);
    }
}

const buttons = document.querySelectorAll("td");
buttons.forEach((td) => 
    td.addEventListener("click", () =>
        handleButtonPress(td.innerHTML)
    )
)