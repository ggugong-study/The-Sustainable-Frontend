/**
 * 가격을 변경하는 행동의 결과를 변수에 담고 그 값을 HTML에 출력
 */
$input.addEventListener("change", (event) => {
  const discount = 0.1;

  // 사용자가 입력한 결과를 변수에 저장
  const price = Number(event.target.value);

  // 변수에 담긴 최근값을 사용해 출력할 값을 계산
  const discountedPrice = price * (1 - discount);

  const $result = document.querySelector("#result");

  // 값을 처리한 후 화면에 출력
  $result.textContent = `${discountedPrice}원`;
});

/**
 * [요구사항 변경]
 * 할인율과 가격을 변경하는 행동의 결과를 변수에 담고 그 값을 HTML에 출력
 *
 * @dscription 간단한 요구사항이 변경되었지만, 변수가 전역에 선언되어 있어, 어디서든 접근 가능하다. 즉 변경 범위가 넓어졌다.
 */
let discount = 0.1;
let price = 10000;

// 할인율 변경
$discountInput.addEventListener("change", (event) => {
  discount = Number(event.target.value) / 100;
  const discountedPrice = price * (1 - discount);

  const $result = document.querySelector("#result");

  $result.textContent = `${discountedPrice}원`;
});

// 가격 변경
$priceInput.addEventListener("change", (event) => {
  price = Number(event.target.value);
  const discountedPrice = price * (1 - discount);

  const $result = document.querySelector("#result");

  $result.textContent = `${discountedPrice}원`;
});

/**
 * 변수 의존성을 최소화하기 위해서, 스코프로 제한할 수 있다.
 * 리액트에서는 컴포넌트를 분리하여, 스코프를 제한할 수 있다.
 */
(() => {
  let discount = 0.1;
  let price = 10000;

  // 할인율 변경
  $discountInput.addEventListener("change", (event) => {
    discount = Number(event.target.value) / 100;
    const discountedPrice = price * (1 - discount);

    const $result = document.querySelector("#result");

    $result.textContent = `${discountedPrice}원`;
  });

  // 가격 변경
  $priceInput.addEventListener("change", (event) => {
    price = Number(event.target.value);
    const discountedPrice = price * (1 - discount);

    const $result = document.querySelector("#result");

    $result.textContent = `${discountedPrice}원`;
  });
})();

// 함수 의존성
function getNumberWithHyphen(str) {
  return str.replace(/[^0-9-]/g, "");
}

function getNumber(str) {
  return str.replace(/\D/g, "");
}

function parsePhoneNumber(value, parser) {
  return parser(value);
}

$inputPhoneNumber.addEventListener("change", (event) => {
  const value = event.target.value;
  const parsedValue = parsePhoneNumber(value, getNumberWithHyphen);

  const $result = document.querySelector("#result");

  $result.textContent = parsedValue;
});
