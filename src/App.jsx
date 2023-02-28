import { useEffect, useState } from "react";
import Numbers from "./components/Numbers";
import { evaluate } from "mathjs";

function App() {
  const [result, setResult] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [sign, setSign] = useState("=");
  const [expression, setExpression] = useState("");
  const [data, setData] = useState([
    { element: "AC", onClick: () => reset() },
    { element: "+/-" },
    { element: "%" },
    { element: "÷", operator: true },
    { element: 7 },
    { element: 8 },
    { element: 9 },
    { element: "x", operator: true },
    { element: 4 },
    { element: 5 },
    { element: 6 },
    { element: "-", operator: true },
    { element: 1 },
    { element: 2 },
    { element: 3 },
    { element: "+", operator: true },
    { element: "0" },
    { element: "." },
    { element: "=" },
  ]);

  const setDataBoard = (value) => {
    if(value === "AC") return reset();
    if(currentNumber.toString().indexOf(".") > 0 && value === "." ) return;
    setCurrentNumber((v) => `${v === 0 ? "" : v}` + value);
    setExpression((v) => `${v === 0 ? "" : v}` + value);
  };

  const handleSign = (sign) => {
    if (sign === "x") sign = "*";
    if (sign === "÷") sign = "/";
    setExpression((v) => `${v === 0 ? "" : v}` + sign);
  };

  const reset = () => {
    setCurrentNumber(0);
    setResult("");
    setExpression("");
  };

  const calculateResult = () => {
    setResult(evaluate(expression));
  };

  return (
    <div className="bg-blue-100 bg-opacity-20 h-screen w-full flex items-center">
      <div className="w-[400px] h-[600px] m-auto grid text-center grid-cols-4 grid-rows-6">
        <div className="col-span-4 bg-[#7a7b88] text-white text-5xl flex items-center justify-end pr-4">
          <span>{result === "" ? currentNumber : result}</span>
        </div>
        {data.map((value, index) => {
          return (
            <Numbers
              key={index}
              onClick={
                value.element === "="
                  ? calculateResult
                  : value.operator
                  ? () => {
                      handleSign(value.element);
                      setCurrentNumber(0);
                    }
                  : () => setDataBoard(value.element)
              }
              value={value.element}
              className={`${value.element === "0" ? "col-span-2" : ""} ${
                value.operator ? "sign" : ""
              }`}
            />
          );
        })}
        {}
      </div>
    </div>
  );
}

export default App;
