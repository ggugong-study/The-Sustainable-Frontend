// 무료 필터의 값에 따라 요소 비활성화 여부를 결정
$filter.addEventListener("change", ({ target }) => {
  // 무료 필터를 선택했을 때
  if (target.value === "free") {
    $orderByPrice.disabled = true;
    $filterByPoint.disabled = true;

    return;
  }

  $orderByPrice.disabled = false;
  $filterByPoint.disabled = false;
});
// "필터의 값이 free라면 가격 정렬 선택, 포인트 제공 여부를 비활성하고 필터의 값이 free가 아니라면 이 둘을 활성합니다"와 같은 정보를 "전달하는 값에 따른 정렬 및 필터 활성화 조정"으로 추상화 할 수 있다.

// 예제 5.2
// 요소를 다루는 것과 관련된 정보를 함수로 추상화
$filter.addEventListener("change", ({ target }) => {
  // 전달하는 값에 따라 정렬과 필터를 조정합니다.
  adjustOrdersAndFiltersBy(target.value);
});
// 필터가 점점 많아지고. adjustOrdersAndFiltersBy 함수에서 다루는 요소가 많아지면서 예제 5.2의 코드를 예제 5.3과 같이 일반화(추상화)할 수 있다.

// 예제 5.3
// 추상화를 통해 정보를 더욱 일반화
$filter.addEventListener("change", ({ target }) => {
  // 전달하는 값에 따라 UI를 조정합니다.
  adjustUIBy(target.value);
});
// 주목해야할 점은 "적절한 추상화 수준" 이다. adjustOrdersAndFiltersBy 함수가 다루는 요소가 많아지고, 그에 따라 예제 5.3과 같이 함수 이름을 수정한 것은, 예제 5.2의 adjustOrdersAndFiltersBy 함수가 새로운 요구사항을 기준으로 많은 정보를 노출하고 있기 때문이다. 즉 추상화가 덜 이뤄진 것이다.

/**
 * 직관적인 네이밍인데 왜 adjustOrdersAndFiltersBy 함수가 추상화가 덜 이뤄졌다고 했을까?
 * - 정렬과 필터를 조정하는, 즉 2가지의 일을 담당해서 그런걸까?
 *   - 문제는 이름이 "무엇을 하는지(의도)가 아니라 무엇으로 구성되어 있는지(구현)"를 말하기 때문이다.
 * - 네이밍으로 인해 요구사항 변화에 유연하지 못해서 그런걸까? 그렇다면 이건 어디까지 더 고려해야하는걸까?
 *   - 미래를 예측하는것이 아닌, 이름이 더 이상 하는 일을 설명하지 못할 때 변경해야한다. (YAGNI 필요할 때까지 만들지 않기)
 * - adjstUIBy가 굉장히 추상적(더 포괄적인 범위)인데 네이밍을 이렇게 지어야하는 걸까?
 *   - 호출부는 의도 수준의 네이밍으로, 내부 코드는 구체적으로 작성하는것이 좋다.
 */

// adjustOrdersAndFiltersBy 함수 정렬과 필터를 조정하는데 이건 의도가 아닌건가?
// 이 도서에서 말하는 의도 vs 구현은 "의도가 없다"는 뜻이 아니라, 어느 층의 의도를 이름에 담았는가?의 차이이다.
// adjustOrdersAndFiltersBy는 정렬과 필터를 조정한다고 말하고 있다. 이 화면에서 정렬, 필터라는 부품을 만진다는 구현 구조에 가까운 의도이다.
