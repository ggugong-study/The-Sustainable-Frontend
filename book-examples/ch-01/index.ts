// 함수를 사용하는 곳에 Parser 인터페이스를 정의했을 때
(() => {
  // parsers.ts
  const getNumber = (str: string) => str.replace(/\D/g, "");

  const getNumberWithHyphen = (str: string) => str.replace(/[^0-9-]/g, "");

  // index.ts
  type Parser = (value: string) => string;

  function parsePhoneNumber(value: string, parser: Parser) {
    return parser(value);
  }

  $inputPhoneNumber.addEventListener("change", (event: KeyboardEvent) => {
    const phoneNumber = (event.target as HTMLInputElement).value;
    const parsedValue = parsePhoneNumber(phoneNumber, getNumberWithHyphen);
  });
})();

/**
 * Parser 인터페이스를 parsers.ts 파일에 정의했을 때
 * parserPhoneNumber 함수는 parsers.ts 파일에 정의된 함수를 사용한다. 즉 Parser 인터페이스를 의존하고 있다.
 */
(() => {
  // parsers.ts
  type Parser = (value: string) => string;

  const getNumber = (str: string) => str.replace(/\D/g, "");

  const getNumberWithHyphen = (str: string) => str.replace(/[^0-9-]/g, "");

  // index.ts
  function parsePhoneNumber(value: string, parser: Parser) {
    return parser(value);
  }

  $inputPhoneNumber.addEventListener("change", (event: KeyboardEvent) => {
    const phoneNumber = (event.target as HTMLInputElement).value;
    const parsedValue = parsePhoneNumber(phoneNumber, getNumberWithHyphen);
  });
})();
