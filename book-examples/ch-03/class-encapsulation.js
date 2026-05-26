/**
 * 예제 3.13
 * 객체를 사용한 카운터
 * NOTE: count 속성이 외부에 그대로 노출되어 있다.
 */
const counter = {
  count: 0,
  increase() {
    this.count += 1;
  },
  decrease() {
    this.count -= 1;
  },
};

/**
 * 예제 3.14
 * increase를 한 번만 실행했음에도 count에 1이 담겨 있음
 * NOTE: count 속성이 외부에 그대로 노출되어 있어 외부에서 값을 직접 할당할 수 있다. 따라서 코드의 흐름을 파악하기 어렵다.
 */

counter.increase();
console.log(counter.count);

// 코드 어디간에서 counter.count에 값을 직접 할당
counter.count = 10;
console.log(counter.count); // 10

/**
 * 예제 3.15
 * 클래스를 사용해 캡슐화
 */
class Counter {
  #count = 0;

  increase() {
    this.#count += 1;
  }

  decrease() {
    this.#count -= 1;
  }

  getCount() {
    return this.#count;
  }
}

/**
 * 예제 3.16
 * 타입스크립트를 사용해 카운터를 캡슐화
 */
class Counter {
  private count = 0;

  public increase(){
    this.count += 1;
  }

  public decrease(){
    this.count -= 1;
  }

  public getCount(){
    return this.count;
  }
}

/**
 * 예제 3.17
 * 조건부 옵션 데이터 구조
 */
/**
 * @typedef {Object} Selection
 * @property {number} id 선택지 아이디
 * @property {string} label 선택지 라벨
 * @property {number} additionalPrice 선택했을 때 가격에 추가되는 금액
 */

/**
 * @typedef {Object} Option
 * @property {number} id 옵션 아이디
 * @property {number | null} preconditionSelectionId 이 옵션을 활성화하는 선택지 아이디. null이라면 조건 없이 활성화
 * @property {Selection[]} selections 선택지 목록
 */

{
  options: [
    {
      id: 1,
      preconditionSelectionId: null,
      selections: [
        { id: 11, label: '옵션1의 선택지 1', additionalPrice: 0 },
        { id: 12, label: '옵션1의 선택지 2', additionalPrice: 0 },
      ],
    },
    {
      id: 2,
      preconditionSelectionId: 11,
      selections: [
        { id: 13, label: '옵션2의 선택지 1', additionalPrice: 1000 },
        { id: 14, label: '옵션2의 선택지 2', additionalPrice: 20000 },
      ],
    },
    {
      id: 3,
      preconditionSelectionId: 12,
      selections: [
        { id: 15, label: '옵션3의 선택지 1', additionalPrice: 500 },
        { id: 16, label: '옵션4의 선택지 2', additionalPrice: 0 },
      ],
    },
  ];
}

/**
 * 예제 3.18
 * 선택지를 선택했을 때 옵션을 활성화하는 기능
 */
const options = await getProductOptions(productId);

// 화면에 있는 모든 select 요소에 change 이벤트를 추가
document.querySelectorAll('select').forEach(($select) =>
  $select.addEventListener('change', (event) => {
    const $selects = document.querySelectorAll('select');
    // 선택한 선택지 아이디
    const selectedOptionIds = Array.from($selects).map(($select) =>
      Number($select.value),
    );

    options.forEach((option) => {
      // 선택한 선택지 아이디 중 옵션을 활성화 하는 선택지가 있다면 보여주고 아니라면 화면에서 숨김
    });
  }),
);

/**
 * 예제 3.19
 * 옵션이 바뀌었을 때 상품의 가격을 변경
 */

// 화면에 있는 모든 select 요소에 change 이벤트를 추가
document.querySelectorAll('select').forEach(($select) =>
  $select.addEventListener('change', (event) => {
    const $selects = document.querySelectorAll('select');
    // 선택한 선택지 아이디
    const selectedOptionIds = Array.from($selects).map(($select) =>
      Number($select.value),
    );

    let additionalPrice = 0;

    options.forEach((option) => {
      // 활성화 로직
      const showOption =
        option.preconditionSelectionId === null ||
        selectedOptionIds.includes(option.preconditionSelectionId);
      // 선택한 선택지 아이디 중 옵션을 활성화 하는 선택지가 있다면 보여주고 아니라면 화면에서 숨김

      // 옵션 선택에 따른 상품 가격 계산 로직
      // selectedSelection에 해당하든 선택지의 additionalPrice를 가져옴
      const selectedSelection = option.selections.find((selection) =>
        selectedOptionIds.includes(selection.id),
      );

      if (selectedSelection) {
        additionalPrice = additionalPrice + selectedSelection.additionalPrice;
      }
    });

    // 선택한 선택지에 맞춰 가격 변경
  }),
);
/**
 * 예제 3.20
 * 복잡한 코드를 함수로 추출
 */

/**
 * ...
 * @returns {{ $option: HTMLElement, isActivate: boolean }[]} 옵션과 활성화 여부
 */
const getOptionsWithWhetherActivate = (options, selectedOptionIds) => {
  options.forEach((option) => {
    const showOption =
      option.preconditionSelectionId === null ||
      selectedOptionIds.includes(option.preconditionSelectionId);
    // 선택한 선택지 아이디 중 옵션을 활성화 하는 선택지가 있다면 보여주고 아니라면 화면에서 숨김

    // ...
  });
  // ...
};

/**
 * ...
 * @returns {number} 선택한 선택지에 따른 추가 금액
 */
const calculateAdditionalPrice = (options, selectedOptionIds) => {
  let additionalPrice = 0;

  // selectedSelection에 해당하는 선택지의 additionalPrice를 가져옴
  options.forEach((option) => {
    const selectedSelection = option.selections.find((selection) =>
      selectedOptionIds.includes(selection.id),
    );

    if (selectedSelection) {
      additionalPrice = additionalPrice + selectedSelection.additionalPrice;
    }
  });

  return additionalPrice;
};

// 화면에 있는 모든 select 요소에 change 이벤트를 추가
document.querySelectorAll('select').forEach(($select) =>
  $select.addEventListener('change', (event) => {
    const $selects = document.querySelectorAll('select');
    // 선택한 선택지 아이디
    const selectedOptionIds = Array.from($selects).map(($select) =>
      Number($select.value),
    );

    const $options = getOptionsWithWhetherActivate(options, selectedOptionIds);
    // 선택한 선택지에 따른 옵션 요소와 활성화 여부를 사용하여 화면에 노출 또는 숨김

    const additionalPrice = calculateAdditionalPrice(
      options,
      selectedOptionIds,
    );
    // 선택한 선택지에 맞춰 상품 가격 변경
  }),
);

/**
 * 예제 3.21
 * 이벤트 리스너에서 분리한 함수들
 * NOTE: 두 함수 사이에 공통적으로 사용하는 로직을 isSelectedOptionIdsHasId 함수로 분리
 */
const isSelectedOptionIdsHasId = (selectedOptionIds, id) => {
  if (!Array.isArray(selectedOptionIds) || selectedOptionIds.length === 0) {
    return false;
  }

  return selectedOptionIds.includes(id);
};

const getOptionsWithWhetherActivate = (options, selectedOptionIds) => {
  options.forEach((option) => {
    const showOption =
      option.preconditionSelectionId === null ||
      isSelectedOptionIdsHasId(
        selectedOptionIds,
        option.preconditionSelectionId,
      );
    // 선택한 선택지 아이디 중 옵션을 활성화 하는 선택지가 있다면 보여주고 아니라면 화면에서 숨김

    // ...
  });
  // ...
};

const calculateAdditionalPrice = (options, selectedOptionIds) => {
  let additionalPrice = 0;

  // selectedSelection에 해당하든 선택지의 additionalPrice를 가져옴
  options.forEach((option) => {
    const selectedSelection = option.selections.find((selection) =>
      isSelectedOptionIdsHasId(selectedOptionIds, selection.id),
    );

    if (selectedSelection) {
      additionalPrice = additionalPrice + selectedSelection.additionalPrice;
    }
  });

  return additionalPrice;
};

// 화면에 있는 모든 select 요소에 change 이벤트를 추가
document.querySelectorAll('select').forEach(($select) =>
  $select.addEventListener('change', (event) => {
    // 이전과 동일
  }),
);

/**
 * 예제 3.22
 * 클래스를 활용한 캡슐화
 */
class Options {
  #options;

  constructor(options) {
    this.#options = [...options];
  }

  // isSelectedOptionIdsHasId는 외부에서 사용하지 않기 때문에 private하게 숨깁니다.
  #isSelectedOptionIdsHasId(selectedOptionIds, id) {
    // ...
  }

  getOptionsWithWhetherActivate(selectedOptionIds) {
    // ...
  }

  calculateAdditionalPrice(selectedOptionIds) {
    // ...
  }
}

const productOptions = await getProductOptions(productId);
const options = new Options(productOptions);

// 화면에 있는 모든 select 요소에 change 이벤트를 추가
document.querySelectorAll('select').forEach(($select) =>
  $select.addEventListener('change', (event) => {
    const $selects = document.querySelectorAll('select');
    // 선택한 선택지 아이디
    const selectedOptionIds = Array.from($selects).map(($select) =>
      Number($select.value),
    );

    const $options = options.getOptionsWithWhetherActivate(selectedOptionIds);
    // 선택한 선택지에 따른 옵션 요소와 활성화 여부를 사용하여 화면에 노출 또는 숨김

    const additionalPrice = options.calculateAdditionalPrice(selectedOptionIds);
    // 선택한 선택지에 맞춰 상품 가격 변경
  }),
);


