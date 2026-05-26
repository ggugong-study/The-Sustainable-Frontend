/**
 * 예제 3.9
 * 클로저
 * NOTE: 클로저는 특정 스코프의 변수나 함수를 외부로부터 격리하면서도 정해진 방법(인터페이스)를 통해 내부 정보에 접근할 수 있게 해주는 방법이다.
 */
function outerFunction(value) {
  return function innerFunction() {
    console.log("value:", value);
  };
}

const printValue = outerFunction("Hello closure!");

printValue();

/**
 * 예제 3.10
 * 객체를 클로저로 반환하는 즉시 실행 함수
 * NOTE: 클로저를 한 번만 생성해서 사용하고 싶다면 즉시 실행 함수를 활용하는 것이 좋다.
 * NOTE: 익명이 아닌 기명 함수를 사용한 이유는 내부에서 에러 발생 시 함수 이름이 로그에 표시되어 디버깅하기 쉽기 때문이다.
 */
const ObjectUsingClosure = (function ObjectUsingClosureInitializer() {
  let _private = "private";

  return {
    public: "public",
    getPrivate() {
      return _private;
    },
    setPrivate(value) {
      _private = value;
    },
  };
})();

const privateValue = ObjectUsingClosure.getPrivate();
ObjectUsingClosure.setPrivate("private !!");
const privateValueAfterChange = ObjectUsingClosure.getPrivate();

console.log("privateValue:", privateValue);
console.log("privateValueAfterChange:", privateValueAfterChange);

/**
 * 예제 3.11 (클로저를 활용한 예시)
 * 이메일을 입력받는 요소의 이벤트 리스너와 중복 확인 로직
 */
const $inputEmail = document.querySelector("#inputEmail");
$inputEmail.addEventListener(
  "change",
  (() => {
    let isLoading = false;
    const duplicatedEmails = new Set();
    const showDuplicationAlert = () => {
      alert("이미 등록된 이메일입니다.");
    };

    return async (event) => {
      if (isLoading) {
        return;
      }

      const email = event.target.value;

      if (duplicatedEmails.has(email)) {
        showDuplicationAlert();

        return;
      }

      isLoading = true;
      const isDuplicated = await checkEmailIsDuplicated(email);

      if (isDuplicated) {
        duplicatedEmails.add(email);
        showDuplicationAlert();
      }

      isLoading = false;
    };
  })(),
);

/**
 * 예제 3.12 (클로저를 활용하지 않은 예시)
 * 이메일을 입력받는 요소의 이벤트 리스너와 중복 확인 로직
 */
let isDuplicationCheckLoading = false;
const duplicatedEmails = new Set();
const showDuplicationAlert = () => {
  alert("이미 등록된 이메일입니다.");
};

const $inputEmail = document.querySelector("#inputEmail");
$inputEmail.addEventListener("change", async (event) => {
  if (isDuplicationCheckLoading) {
    return;
  }

  const email = event.target.value;

  if (duplicatedEmails.has(email)) {
    showDuplicationAlert();

    return;
  }

  isDuplicationCheckLoading = true;
  const isDuplicated = await checkEmailIsDuplicated(email);

  if (isDuplicated) {
    duplicatedEmails.add(email);
    showDuplicationAlert();
  }

  isDuplicationCheckLoading = false;
});
