// 추상화 전 페이지 컴포넌트
function ProductListPage() {
  const [products, setProducts] = useState();
  const [recommendProducts, setRecommendProducts] = useState();
  const [recommendByMDProducts, setRecommendByMDProducts] = useState();

  // ...

  return (
    <div>
      <h1>상품 페이지</h1>
      <h2>이벤트 상품 목록</h2>
      {products.map((product) => (
        <div>{/* ... */}</div>
      ))}
      <h2>추천 상품 목록</h2>
      <h3>오늘 추천 상품 목록</h3>
      {recommendProducts.map((product) => (
        <div>{/* ... */}</div>
      ))}
      <h3>MD가 추천하는 상품 목록</h3>
      {recommendByMDProducts.map((product) => (
        <div>{/* ... */}</div>
      ))}
    </div>
  );
}

// ProductListPage -> EventProductList
//                 -> 추천 상품 요소 렌더링
function ProductListPage() {
  const [products, setProducts] = useState();
  const [recommendProducts, setRecommendProducts] = useState();
  const [recommendByMDProducts, setRecommendByMDProducts] = useState();

  // ...

  return (
    <div>
      <h1>상품 페이지</h1>
      <EventProductList title="이벤트 상품 목록" products={products} />
      <h2>추천 상품 목록</h2>
      <h3>오늘 추천 상품 목록</h3>
      {recommendProducts.map((product) => (
        <div>{/* ... */}</div>
      ))}
      <h3>MD가 추천하는 상품 목록</h3>
      {recommendByMDProducts.map((product) => (
        <div>{/* ... */}</div>
      ))}
    </div>
  );
}

function ProductListPage() {
  const [products, setProducts] = useState();
  const [recommendProducts, setRecommendProducts] = useState();
  const [recommendByMDProducts, setRecommendByMDProducts] = useState();

  // ...

  return (
    <div>
      <Title title="상품 페이지" />
      <EventProductList title="이벤트 상품 목록" products={products} />
      <RecommendProductList
        title="추천 상품 목록"
        products={recommendProducts}
        productsByMD={recommendByMDProducts}
      />
    </div>
  );
}
