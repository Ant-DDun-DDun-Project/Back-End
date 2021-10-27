jest.mock('../models/users');
jest.mock('../models/votes');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/either');
jest.mock('../models/comment-likes');
jest.mock('../models/child-comments');
jest.mock('../models/multi');

const Comment = require('../models/comments');
const { editComment } = require('../controllers/comment');

describe('댓글 수정에 대한 검사', () => {
  const req = {
    params: {
      multi_id: 1,
      comment_id: 1,
    },
    body: {
      comment: '수정되었습니다.',
      editDate: '2021-10-28 11:11:10',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test('댓글 수정에 성공하였으면 / success: true / 를 응답으로 보내준다.', async () => {
    await Comment.update.mockReturnValue(true);
    await editComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('DB 요청에 대한 에러가 발생', async () => {
    const err = 'DB error'
    Comment.update.mockReturnValue(Promise.reject(err))
    await editComment(req, res, next);
    expect(next).toBeCalledWith(err);
  })
});