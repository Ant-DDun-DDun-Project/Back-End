jest.mock('../models/child-comments');
jest.mock('../models/votes');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/either');
jest.mock('../models/comment-likes');
jest.mock('../models/multi');
jest.mock('../models/users');

const Comment = require('../models/comments');
const { deleteComment } = require('../controllers/comment');

describe('댓글 삭제에 대한 검사', () => {
  const req = {
    params: {
      multi_id: 1,
      comment_id: 1,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test('댓글 삭제에 성공하였으면 / success: true / 를 응답으로 보내준다.', async () => {
    await Comment.update.mockReturnValue(true);
    await deleteComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('DB 요청에 대한 에러가 발생', async () => {
    const err = 'DB error'
    Comment.update.mockReturnValue(Promise.reject(err))
    await deleteComment(req, res, next);
    expect(next).toBeCalledWith(err);
  })
});