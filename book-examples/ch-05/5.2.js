// 예제 5.4
// 두 수를 더하는 코드
function doSomething() {
  // ...
  const result = value1 + value2;
  // ...
}

// 예제 5.5
// 더하는 연산을 함수 sum으로 추상화
function doSomething() {
  // ...
  const result = sum(value1, value2);
  // ...
}

// 예제 5.6
// sum 함수의 후보
function sum(...values) {
  return values.reduce((acc, val) => acc + val, 0);
}

function sum(value1, value2) {
  return value1 + value2;
}

function sum(value1, value2) {
  if (typeof value1 !== "number" && typeof value2 !== "number") {
    throw new Error("인수는 모두 숫자 값이어야 합니다");
  }

  if (Number.isNaN(value1) || Number.isNaN(value2)) {
    throw new Error("인수로 NaN을 전달할 수 없다");
  }

  return value1 + value2;
}
