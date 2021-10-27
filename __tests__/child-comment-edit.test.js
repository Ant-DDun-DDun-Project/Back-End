jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
const { ChildComment } = require('../models');
const { editChildComment } = require('../controllers/child-comment');

describe('대댓글 수정', () => {
  const req = {
    params: {
      multi_id: '1',
      comment_id: '1',
    },
    body: {
      comment: '하하하하하',
      editedDate: '2021-10-27 22:51:22',
    },
  };
  const res = {
    locals: {
      user: '1',
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('댓글수정에 성공하면 response로 success:true를 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(
      Promise.resolve({
        id: 1,
        comment: '댓글입니다!',
        date: '2021-10-27 11:10:8',
        edited: false,
        editedDate: null,
        user: '1',
        multi: '1',
      })
    );
    await ChildComment.update.mockReturnValue(
      Promise.resolve({
        id: 1,
        comment: '하하하하하',
        date: '2021-10-27 11:10:8',
        edited: true,
        editedDate: '2021-10-27 22:51:22',
        user: '1',
        multi: '1',
      })
    );
    await editChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('댓글 수정 시 수정할 댓글을 찾지 못하면 response로 success:false를 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(null);
    await editChildComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러 시 next(err)를 호출한다.', async () => {
    const err = 'DB에러';
    await ChildComment.findOne.mockRejectedValue(err);
    await ChildComment.update.mockRejectedValue(err);
    await editChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
