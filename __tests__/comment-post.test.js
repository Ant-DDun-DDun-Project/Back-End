jest.mock('../models/comments');
const { Comment } = require('../models/comments');

describe('댓글등록', async () => {
  const req = {
    params: {
      multi_id: '1',
    },
    body: {
      comment: '안녕하세요',
      date: '2021-10-26-19-43-23',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  next = jest.fn();
  test('댓글을 등록에 성공하면 response로 success:true를 보내준다', async () => {
    await postComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('댓글 작성시 DB에러 발생 시 next(err)를 호출한다', async () => {
    const err = 'DB에러';
    await Comment.create.mockRejectedValue(err);
    await postComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
