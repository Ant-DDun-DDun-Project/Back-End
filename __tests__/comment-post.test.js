jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
const { Comment } = require('../models');
const { postComment } = require('../controllers/comment');

describe('댓글등록', () => {
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
    locals: {
      user: '1',
    },
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
