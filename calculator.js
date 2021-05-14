const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));
const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");

// 초기값 설정
let firstValue = "",
  firstDone,
  secondValue = "",
  secondDone;

// 숫자 클릭 이벤트 함수
// first value 가 없다면 처음 입력값을 first value에 넣어주고 first value가 있다면 second value에 넣음
const handleNumber = (e) => {
  const clickNum = e.target.innerText;
  if (!firstDone) {
    if (parseInt(clickNum) !== 0) {
      firstValue = firstValue + clickNum;
      result.innerHTML = firstValue.substring(1);
    } else {
      firstValue = "0";
      result.innerHTML = firstValue;
    }
  } else {
    if (parseInt(clickNum) !== 0) {
      secondValue = secondValue + clickNum;
      result.innerHTML = secondValue.substring(1);
      secondDone = true;
    } else {
      secondValue = "0";
      result.innerHTML = secondValue;
    }
  }
};

// first, second value를 int로 바꿔주고 switch문을 이용하여
// 사칙 연산 진행
const doOperation = () => {
  const inputA = parseInt(firstValue);
  const inputB = parseInt(secondValue);
  switch (currentOperation) {
    case "+":
      return inputA + inputB;
    case "-":
      return inputA - inputB;
    case "*":
      return inputA * inputB;
    case "/":
      return inputA / inputB;
    default:
      return;
  }
};

// 계산 결과값을 출력해주는 함수
// 연속 계산을 위해서 result 값을 first value로 넣어주고 새로 입력한 값을 second value로 넣어줌
const calculate = () => {
  const operation = doOperation();
  result.innerHTML = operation;
  firstValue = operation;
  secondDone = false;
  secondValue = "";
};

// 사칙연산 버튼 클릭시 이벤트 함수
const handleOperation = (e) => {
  const clickedOperation = e.target.innerText;
  if (!firstDone) {
    firstDone = true;
  }
  if (firstDone && secondDone) {
    calculate();
  }
  currentOperation = clickedOperation;
};

// 리셋 버튼 클릭 이벤트 함수
const handleReset = () => {
  result.innerHTML = "0";
  firstValue = "";
  firstDone = false;
  secondValue = "";
  secondDone = false;
};

// = 버튼 클릭 이벤트 함수
const handleEquals = () => {
  if (firstDone && secondDone) {
    calculate();
  }
};

// 각 버튼에 클릭 이벤트 추가
numbers.forEach((number) => number.addEventListener("click", handleNumber));
operations.forEach((operation) =>
  operation.addEventListener("click", handleOperation)
);
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleEquals);
