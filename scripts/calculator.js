const OPERATORS = ['+','-','*','/'];

const linePrevious = document.querySelector("#previousOperation");
const resultPrevious = document.querySelector("#previousResult");

const operands = {
    adderFirst: document.querySelector("#adderFirst"),
    operator: document.querySelector("#operator"),
    adderSecond: document.querySelector("#adderSecond")
}

function getOperands(){
    return {
        _adderFirst: operands.adderFirst.innerHTML,
        _operator: operands.operator.innerHTML,
        _adderSecond: operands.adderSecond.innerHTML
    };
}

function setOperands(newOperands=["","",""]){
    operands.adderFirst.innerHTML = newOperands[0];
    operands.operator.innerHTML = newOperands[1];
    operands.adderSecond.innerHTML = newOperands[2];
}

function clearCalculator(){
    if (operands.adderSecond.innerHTML == "" && operands.operator.innerHTML == "" && operands.adderSecond.innerHTML == ""){
        linePrevious.innerHTML = "";
        resultPrevious.innerHTML = "";
    }
    setOperands();
}

function evalCalculator(){
    linePrevious.innerHTML = Object.keys(operands).reduce((accumulator, currentValue) => accumulator.concat(operands[currentValue].innerHTML.concat(" ")),"").concat("=");
    const floatA = parseFloat(operands.adderFirst.innerHTML);
    const floatB = parseFloat(operands.adderSecond.innerHTML);
    switch (operands.operator.innerHTML) {
        case "/":
            resultPrevious.innerHTML = Math.round(100*floatA/floatB)/100;
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
            resultPrevious.innerHTML = floatB;
            break;
    }
}

function handleButtonPress(operandIn) {
    const calcLine = getOperands();
    if (operandIn == "C"){
        clearCalculator();
    }
    else if (operandIn == "="){
        if (calcLine._adderSecond != ""){
            evalCalculator();
            clearCalculator();
        }
    }
    else if (operandIn == "."){
        if (!calcLine._adderSecond.includes(".")){
            operands.adderSecond.innerHTML = calcLine._adderSecond.concat(operandIn);
        }
    }
    else if (OPERATORS.includes(operandIn)){
        if (calcLine._operator == ""){
            if (calcLine._adderSecond != ""){
                if (calcLine._adderFirst != ""){
                    evalCalculator();
                    setOperands([
                        resultPrevious.innerHTML,
                        operandIn,
                        ""
                    ])
                }
                else{
                    setOperands([
                        calcLine._adderSecond,
                        operandIn,
                        ""
                    ])
                }
            }
            else if (resultPrevious.innerHTML != ""){
                setOperands([
                    resultPrevious.innerHTML,
                    operandIn,
                    ""
                ])
            }
        }
        else if (operandIn == "-"){
            setOperands([
                calcLine._adderFirst,
                calcLine._operator,
                operandIn
            ])
        }
    }
    else{
        operands.adderSecond.innerHTML = calcLine._adderSecond.concat(operandIn);
    }
}

const buttons = document.querySelectorAll("td");
buttons.forEach((td) => 
    td.addEventListener("click", () =>
        handleButtonPress(td.innerHTML)
    )
)