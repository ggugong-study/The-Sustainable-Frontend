import { useState } from "react";

// changeAmount 함수에 음수를 전달할 수 있는지, decrease를 계속해서 사용해도 되는지, 상품 개수가 0보다 작아지지 않도록 외부에서 처리해야 하는지 알기 어렵다.
// const useProductCountInCart = (initialCount: number) => {
//   const [count, setCount] = useState(Math.max(0, initialCount));

//   const increase = () => setCount((prev) => prev + 1);
//   const decrease = () => setCount((prev) => Math.max(0, prev - 1));
//   const changeAmount = (amount: number) =>
//     setCount(Math.max(0, count + amount));

//   return { count, increase, decrease, changeAmount };
// };

// 주석을 통해 타입 이외의 정보를 개발자에게 제공
export type ProductCountInCart = {
  /** 현재 장바구니에 담긴 상품 개수 */
  count: number;
  /** 개수를 1 늘립니다 */
  increase: () => void;
  /** 개수를 1 줄입니다. 0 미만으로 줄이려 하면 0으로 설정합니다 */
  decrease: () => void;
  /** 개수를 amount만큼 변경합니다. 결과가 0 미만이면 0으로 설정합니다 */
  changeAmount: (amount: number) => void;
};

const useProductCountInCart = (initialCount: number): ProductCountInCart => {
  const [count, setCount] = useState(Math.max(0, initialCount));

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => Math.max(0, prev - 1));
  const changeAmount = (amount: number) =>
    setCount(Math.max(0, count + amount));

  return { count, increase, decrease, changeAmount };
};
