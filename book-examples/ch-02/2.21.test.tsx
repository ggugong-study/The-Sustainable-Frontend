// 먼저 PostDetail 컴포넌트에서 함수 register를 import 해서 사용하도록 수정
import { render } from "@testing-library/react";
import PostDetail from "./PostDetail";

test("PostDetail", async () => {
  const register = async () => Promise.resolve(true);

  render(
    <PostDetail
      postId={1}
      memberType="teacher"
      registered={false}
      registerApi={register}
    />,
  );

  // PostDetail 컴포넌트 테스트
});
