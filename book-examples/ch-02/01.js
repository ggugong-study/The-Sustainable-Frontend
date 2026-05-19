function processOrderData(orderList, { filter, order, group }) {
  const result = [];

  // 주문 내역을 필터링
  const filteredOrderList = orderList.filter((orderItem) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "CANCEL") {
      return orderItem.status === "CANCEL";
    }

    //...
  });

  // 그루핑한 결과를 이중 배열로 생성
  const groupOrderList = filteredOrderList.reduce((acc, orderItem) => {
    if (group === "MONTH") {
      // 달을 기준으로 그루핑
    }

    if (group === "CATEGORY") {
      // 카테고리를 기준으로 그루핑
    }

    return acc;
  }, []);

  if (order === "RECENT") {
    // 최근 주문 순으로 정렬
  }

  if (order === "CHEAP") {
    // 가격이 낮은 순으로 정렬
  }

  return result;
}

// processOrderData 함수의 반환값 예시

// 모든 결과를 보기 위해 필터를 적용하지 않음
// 주문일자 기준 최신순 정렬
// 달을 기준으로 그루핑
[
  // 7월 주문
  [
    {
      id: "1234567890",
      name: "주문명",
      category: "Furniture",
      status: "ORDER_COMPLETED",
      orderDate: "2026-07-18T23:59:59.999Z",
    },
    {
      id: "1234567891",
      name: "주문명",
      category: "Furniture",
      status: "ORDER_COMPLETED",
      orderDate: "2026-07-02T23:59:59.999Z",
    },
    {
      id: "1234567892",
      name: "주문명",
      category: "Furniture",
      status: "ORDER_COMPLETED",
      orderDate: "2026-07-01T23:59:59.999Z",
    },
  ],
  // 6월 주문
  [
    {
      id: "1234567894",
      name: "주문명",
      category: "Furniture",
      status: "ORDER_COMPLETED",
      orderDate: "2026-06-18T23:59:59.999Z",
    },
  ],
  // 5월 주문
  [
    {
      id: "1234567895",
      name: "주문명",
      category: "Furniture",
      status: "ORDER_COMPLETED",
      orderDate: "2026-05-18T23:59:59.999Z",
    },
  ],
];

// CANCEL 필터를 적용하면 그루핑을 하지 않는 로직을 추가
function processOrderData(orderList, { filter, order, group }) {
  const result = [];

  // 주문 내역 필터링
  // ...

  // 그루핑한 결과를 이중 배열로 생성
  const groupedOrderList =
    filter === "CANCEL"
      ? result.push(filteredOrderList)
      : filteredOrderList.reduce((acc, orderItem) => {
          // ...
        }, []);

  // 그루핑한 결과를 정렬
  // ...

  return result;
}

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} category
 * @property {string} status
 * @property {Date} orderDate
 */

// 각 로직의 인터페이스
/**
 * 주문 내역을 필터링하는 함수
 * @param {Order[]} orderList 주문 내역
 * @param {string} filter 필터
 * @returns {Order[]} 필터링된 주문 내역
 */
function filterOrderList(orderList, filter) {
  // ...
}

/**
 * 주문 내역을 그루핑하는 함수
 * @param {Order[]} orderList 주문 내역
 * @param {string} group 그루핑 기준
 * @param {boolean} skipGrouping 그루핑을 건너뛸 경우 true
 * @returns {Order[][]} 그루핑된 주문 내역
 */
function groupOrderList({ orderList, group, skipGrouping }) {
  if (skipGrouping) {
    return [orderList];
  }
  // ...
}

/**
 * 그루핑한 주문 내역을 정렬하느 함수
 * @param {Order[][]} groupedOrderList 그루핑된 주문 내역
 * @param {string} order 정렬 기준
 * @returns {Order[][]} 정렬된 주문 내역
 */
function sortGroupedOrderList(groupedOrderList, order) {
  // ...
}

function processOrderData(orderList, { filter, order, group }) {
  // 주문 내역을 필터링
  const filteredOrderList = filterOrderList(orderList, filter);

  // 그루핑한 결과를 이중 배열로 생성
  const groupedOrderList = groupOrderList({
    orderList: filteredOrderList,
    group,
    skipGrouping: filter === "CANCEL",
  });

  // 그루핑한 주문 내역을 정렬
  const orderedOrderList = sortGroupedOrderList(groupedOrderList, order);

  return orderedOrderList;
}

// 인터페이스와 일급 함수를 활용해 만든 curryProcessOrderData 함수
function curryProcessOrderData({
  filterOrderData,
  groupOrderData,
  orderOrderData,
}) {
  return function processOrderData(orderList, { filter, order, group }) {
    // 주문 내역을 필터링
    const filteredOrderList = filterOrderData(orderList, filter);

    // 그루핑한 결과를 이중 배열로 생성
    const groupedOrderList = groupOrderData({
      orderList: filteredOrderList,
      group,
      skipGrouping: filter === "CANCEL",
    });

    // 그루핑한 주문 내역을 정렬
    const orderedOrderList = orderOrderData(groupedOrderList, order);

    return orderedOrderList;
  };
}

const processOrderData = curryProcessOrderData({
  filterOrderData: filterOrderList,
  groupOrderData: groupOrderList,
  orderOrderData: sortGroupedOrderList,
});

processOrderData(orderList, { filter: "ALL", order: "RECENT", group: "MONTH" });
processOrderData(orderList, {
  filter: "CANCEL",
  order: "RECENT",
  group: "MONTH",
});

// 다른 함수로 바꾸는 경우가 빈번하고 기억에 의존해서 교체해야 한다면 팩토리 패턴 사용

/**
 * @param {"ADMIN" | "CUSTOMER" | "SELLER"} role
 */
const ProcessOrderDataFactory = (role) => {
  if (role === "ADMIN") {
    return curryProcessOrderData({
      filterOrderData: filterOrderData,
      groupOrderData: groupOrderDataForAdmin,
      orderOrderData: sortGroupedOrderData,
    });
  }

  if (role === "CUSTOMER" || role === "SELLER") {
    return curryProcessOrderData({
      filterOrderData: filterOrderData,
      groupOrderData: groupOrderData,
      orderOrderData: orderOrderData,
    });
  }

  throw new Error(`Invalid role: ${role}`);
};

const processOrderData = ProcessOrderDataFactory("CUSTOMER");
