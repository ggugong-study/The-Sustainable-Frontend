/**
 * 예제 4.1
 * 결제 금액을 계산하는 함수
 * 결제 금액을 계산합니다.
 * @param {Product[]} products 구매하려는 상품 목록
 * @returns {number} 결제 금액
 */
function makePayPrice(products) {
  const payPrice = products.reduce((acc, product) => acc + product.price, 0);
  return payPrice;
}

/**
 * 예제 4.2
 * makePayPrice를 인터페이스가 동일한 다른 함수로 바꾸기
 * 결제 금액을 계산합니다.
 * @param {Product[]} products 구매하려는 상품 목록
 * @returns {number} 결제 금액
 */
function makePayPriceVersion2(products) {
  let payPrice = 0;

  for (const product of products) {
    payPrice = payPrice + product.price;
  }

  return payPrice;
}

/**
 * 예제 4.3
 * 할인 정보를 사용해 결제 금액을 계산하는 함수
 */

/**
 * 사용자의 동작에 의해 발생한 상품의 할인 정보를 담는 객체
 * @typedef {Object} Discount
 * @property {number} productId 할인을 적용할 상품 ID
 * @property {string} discountName 할인 이름
 * @property {string} discountCategory 할인 카테고리 (쿠폰, 이벤트, ...)
 * @property {number} discountRate 할인율
 */

/**
 * 사용자의 동작에 의해 적용된 할인 정보
 * @type {Discount[]}
 */
const discounts = [
  // ...
];

// ... discounts를 사용하는 다른 함수 또는 이벤트 코드들

/**
 * 결제 금액을 계산합니다.
 * @param {Product[]} products 구매하려는 상품 목록
 * @returns {number} 결제 금액
 */
function makePayPrice(products) {
  const payPrice = products.reduce((result, product) => {
    // 할인 금액 계산
    const discountAmount = discounts
      .filter((discount) => discount.productId === product.id)
      .reduce((discountResult, discount) => {
        return discountResult + product.price * discount.discountRate;
      }, 0);

    return result + product.price - discountAmount;
  }, 0);

  return payPrice;
}

/**
 * 예제 4.4
 * 감기약을 처방하는 코드
 */
const drugStore = new DrugStore(/* ... */);

// 처방전(prescription)을 전달하여 약을 처방합니다.
const drugForCold = drugStore.prepareMedicine(prescriptionForCold);

/**
 * 예제 4.5
 * 감기약을 처방받을 때마다 다른 약을 처방
 */
// Tylenol과 Penzal은 모두 아세트아미노펜을 주성분으로 하는 진통해열제입니다.
const drugForCold1 = drugStore.prepareMedicine(user);

/**
 * drugForCold1:
 * {
 *   name: 'Tylenol',
 *   price: 1000,
 *   count: 10,
 *   expiredAt: '2029-07-31',
 * }
 */

const drugForCold2 = drugStore.prepareMedicine(user);

/**
 * drugForCold2:
 * {
 *   name: 'Penzal',
 *   price: 1500,
 *   count: 10,
 *   expiredAt: '2029-05-26',
 * }
 */

/**
 * 예제 4.6
 * DrugStore의 내부 구현
 */

class DrugStore {
  #location; // 약국 위치
  #name; // 약국 이름
  #inventory; // 약의 재고

  constructor(location, name, inventory) {
    this.#location = location;
    this.#name = name;
    this.#inventory = inventory;
  }

  #getMedicineFromInventory(prescription) {
    // 지역이 A인 경우 동일한 성분이라면 약을 무작위로 가져옴
    if (this.#location === "A") {
      // ... 구현
      return; /** inventory에서 약을 무작위로 가져옴 */
    }

    // ... 구현
    return; /** inventory에서 한 종류의 약을 가져옴. 다 떨어지면 남아있는 다른 약을 가져옴 */
  }

  /** 약을 포장합니다 */
  #packageMedicine(medicine) {
    // ... 구현
  }

  prepareMedicine(prescription) {
    const medicine = this.#getMedicineFromInventory(prescription);
    const result = this.#packageMedicine(medicine);

    return result;
  }
}

const drugStore = new DrugStore(/* ... */);
// 처방전(prescription)을 전달하여 약을 처방합니다.
const drugForCold = drugStore.prepareMedicine(prescriptionForCold);

if (location === "A") {
  // 처방받은 약이 무작위로 정해진다는 가정하에 코드를 작성
} else {
  // 처방받은 약이 무작위로 정해지지 않는다는 가정하에 코드를 작성
}

/**
 * 위 예제는 외부 코드가 prepareMedicine 메서드의 인터페이스와 무관해 보이는 내부 정보 (약국 위치에 따른 동작 변화)에 의존함으로써 결합도를 높이는 모습을 보여준다
 * 이로 인해 다른 구현체로 교체하는 것뿐만 아니라 코드를 수정할 때도 내부 정보와 같은 세부 구현을 고려해야 하므로 유지보수가 어려워진다
 *
 * 이럴 때는 내부 구현과 관련된 지식이나 정보를 외부에 노출하고 있지는 않은지, 또는 전달해야 한다면 관련 정보를 명세하고 있는지 따져봐야 한다.
 * 주석이나 jsdoc을 사용해 내부나 외부에서 코드를 수정할 때 참고할 수 있도록 개선할 수 있다
 */
