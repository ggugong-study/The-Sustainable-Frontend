/**
 * 예제 3.5
 * 구매 페이지 컴포넌트
 */
import { useState } from "react";

const PurchasePage = () => {
  const [point, setPoint] = useState("");
  const handleChangePrice = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.trim() === "") {
      setPoint("");
      return;
    }

    const newPrice = Number(value).toLocaleString();

    setPoint(newPrice);
  };

  // ...

  return (
    <>
      {/* ... */}
      <label>
        포인트
        <input value={point} onChange={handleChangePrice} />
      </label>
      {/* ... */}
    </>
  );
};

/**
 * 예제 3.6
 * 포인트 초과 입력 오류 수정
 */
import { useRef, useState } from "react";

const PurchasePage = () => {
  const maxPoint = useRef(1000);

  const [point, setPoint] = useState("");

  /**
   * 숫자만 남기고 다른 문자는 제거합니다.
   * @param {string} value
   * @returns {string}
   */
  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  /**
   * 입력한 포인트를 통화(currency) 포맷으로 변경합니다.
   * @param {string} unformattedPoint
   * @returns {string}
   */
  const formatPointAsCurrency = (unformattedPoint) => {
    return Number(unformattedPoint).toLocaleString();
  };

  const handleChangePoint = (event) => {
    const value = parseNumber(event.target.value);

    if (value.trim() === "") {
      setPoint("");
      return;
    }

    setPoint(formatPointAsCurrency(value));
  };

  const handleBlurPoint = (event) => {
    const value = parseNumber(event.target.value);

    if (value.trim() === "") {
      setPoint("");
      return;
    }

    const newPoint = Math.min(Number(value), maxPoint.current);

    setPoint(formatPointAsCurrency(`${newPoint}`));
  };

  return (
    <>
      {/* ... */}
      <label>
        포인트
        <input
          value={point}
          onBlur={handleBlurPoint}
          onChange={handleChangePoint}
        />
      </label>
      {/* ... */}
    </>
  );
};

/**
 * 다른 함수나 리스너에서 formatPointAsCurrency를 사용하지 않고 곧바로 setPoint를 사용해서 통화 형태가 아닌 값을 저장하면 문제가 발생할 수 있다.
 */

/**
 * 예제 3.7
 * 100 포인트 추가 버튼 추가
 */
const PurchasePage = () => {
  const maxPoint = useRef(1000);

  const [point, setPoint] = useState("");

  /**
   * 숫자만 남기고 다른 문자는 제거합니다.
   * @param {string} value
   * @returns {string}
   */
  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  // ...

  const handleClick100Point = () => {
    setPoint((prevPoint) => {
      const newPoint = Math.min(
        Number(parseNumber(prevPoint)) + 100,
        maxPoint.current,
      );
      return `${newPoint}`;
    });
  };

  // ...

  return (
    <>
      {/* ... */}
      <button type="button" onClick={handleClick100Point}>
        +100
      </button>
      {/* ... */}
    </>
  );
};

/**
 * 100 포인트 추가 버튼에 문제가 없었으니 그 로직을 복사하고 숫자만 바꾼 1000포인트 추가 버튼도 문제 없을거라고 판단했지만 실제로는 문제가 발생한다.
 * setPoint를 사용해서 1,000포인트를 추가하면 통화 형태 1,000이 아닌 일반 숫자 형태 1000이 출력되기 때문이다.
 * 이 문제가 발생한 이유 중 하나는 값에 대해 암묵적으로 정의돼 있는 규칙을 지키지 않아도 문제가 없도록 코드가 작성됐기 때문이다.
 * 따라서 값을 사용하는 데 규칙이 있다면 반드시 규칙을 지켜서 사용할 수 있도록 해야한다. 이를 위해 동일한 목적을 가진 대상을 모으고 외부에서 정해진 방법 외에는 접근하지 못하도록 캡슐화한다.
 */

/**
 * 포인트를 입력하는 컴포넌트에서 사용하는 훅입니다.
 * @param {number} userPoint 사용자 보유 포인트
 */
const usePoint = (userPoint) => {
  const userPointRef = useRef(userPoint);
  const [point, setPointOriginal] = useState("");

  /**
   * 숫자만 남기고 다른 문자는 제거합니다.
   * @param {string} value
   * @returns {string}
   */
  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  /**
   * 입력한 포인트를 통화(currency) 포맷으로 변경합니다.
   * @param {string} unformattedPoint
   * @returns {string}
   */
  const formatPointAsCurrency = (unformattedPoint) => {
    return Number(unformattedPoint).toLocaleString();
  };

  return {
    /**
     * 입력한 포인트. 통화(currency) 포맷으로 변경된 값입니다.
     * 예: '123,456'
     * @type {string}
     */
    point,
    /**
     * 현재 포인트에 amount만큼 더합니다.
     * 사용자가 보유한 포인트보다 큰 포인트를 입력하면 사용자가 보유한 포인트로 변경합니다.
     * @param {number} amount
     */
    increasePoint: (amount) => {
      const parsedPoint = parseNumber(point);
      const newPoint = Math.min(
        Number(parsedPoint) + amount,
        userPointRef.current,
      );
      setPointOriginal(formatPointAsCurrency(newPoint));
    },
    setPoint: (unformattedPoint) => {
      const number = parseNumber(unformattedPoint);
      setPointOriginal(formatPointAsCurrency(number));
    },
    /**
     * 사용자가 보유한 포인트보다 큰 포인트를 입력하면 사용자가 보유한 포인트로 변경합니다.
     * @param {string} unformattedPoint
     */
    setPointUpToUserPoint: (unformattedPoint) => {
      const number = parseNumber(unformattedPoint);
      const newPoint = Math.min(Number(number), userPointRef.current);
      setPointOriginal(formatPointAsCurrency(newPoint));
    },
  };
};

export const PurchasePage = () => {
  const { point, increasePoint, setPoint, setPointUpToUserPoint } =
    usePoint(1000);

  const handleChangePoint = (event) => {
    const value = event.target.value;

    setPoint(value);
  };

  const handleBlurPoint = (event) => {
    const value = event.target.value;

    if (value.trim() === "") {
      setPoint("");
      return;
    }

    setPointUpToUserPoint(value);
  };

  const handleClick100Point = () => {
    increasePoint(100);
  };

  return (
    <>
      {/* ... */}
      <button type="button" onClick={handleClick100Point}>
        +100
      </button>
      <label>
        포인트
        <input
          value={point}
          onBlur={handleBlurPoint}
          onChange={handleChangePoint}
        />
      </label>
      {/* ... */}
    </>
  );
};

/**
 * 위 코드에서 포인트와 포인트를 다루는 모든 방법을 usePoint 훅 내부로 캡슐화했다. 이렇게 함으로써 usePoint 외부에서 point를 잘못 사용하거나 설정할 가능성이 줄었다.
 * 그리고 포인트를 다루는 로직을 수정해야할 경우 여기저기 찾아다니지 않고 가장 먼저 usePoint 훅을 보면 된다. usePoint의 인터페이스를 변경하지 않는 한 구현을 변경할 때에도 usePoint 훅 내부를 보면 된다.
 */
