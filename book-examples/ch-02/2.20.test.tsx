// 먼저 PostDetail 컴포넌트에서 함수 register를 import 해서 사용하도록 수정
import { render } from '@testing-library/react';
import PostDetail from './PostDetail';
import register from './api';

jest.mock('./api', () => jest.fn());

test('PostDetail', async () => {
  (register as jest.Mock).mockResolvedValueOnce(true);

  render(<PostDetail postId={1} memberType="teacher" registered={false} />);

  // PostDetail 컴포넌트 테스트
});