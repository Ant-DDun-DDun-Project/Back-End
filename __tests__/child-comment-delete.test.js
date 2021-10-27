jest.mock('../models/child-comments');
jest.mock('../models/users');
jest.mock('../models/either');
jest.mock('../models/multi');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/comments');
jest.mock('../models/comment-likes');

const ChildComment = require('../models/child-comments');
const { deleteChildComment } = require('../controllers/child-comment');

describe('대댓글에 대한 검사', () => {
  const req = {
    params: {
      multi_id: 1,
      comment_id: 1,
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1
    }
  };
  const next = jest.fn();

  test('대댓글 작성에 성공한 경우 / success: true / 를 응답으로 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(true);
    await ChildComment.update.mockReturnValue(true);
    await deleteChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('대댓글 정보가 DB에 존재하지 않는 경우 / success: false / 를 응답으로 보낸다.', async () => {
    await ChildComment.findOne.mockReturnValue(null);
    await deleteChildComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('ChildComment.update() 에 대한 DB 에러 발생', async () => {
    const err = 'DB err';
    await ChildComment.findOne.mockReturnValue(true);
    ChildComment.update.mockReturnValue(Promise.reject(err));
    await deleteChildComment(req, res, next)
    expect(next).toBeCalledWith(err);
  });

  test('ChildComment.findOne() 에 대한 DB 에러 발생', async () => {
    const err = 'DB err';
    ChildComment.findOne.mockReturnValue(Promise.reject(err));
    await deleteChildComment(req, res, next)
    expect(next).toBeCalledWith(err);
  });
});