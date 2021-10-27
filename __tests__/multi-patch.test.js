jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
const { editMulti } = require('../controllers/multi-post');
const { Multi } = require('../models');

describe('객관식 게시물 수정', () => {
  const req = {
    params: {
      multi_id: '1',
    },
    body: {
      title: '제목',
      description: '내용',
      contentA: '하나하나',
      contentB: '둘둘',
      contentC: '삼삼',
      editedDate: '2021-10-27 22:52:00',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  const next = jest.fn();
  test('객관식 게시물 수정이 성공하면 success:true를 보내준다', async () => {
    await Multi.findOne.mockReturnValue(
      Promise.resolve({
        title: '제목',
        description: '내용',
        contentA: '하나하나',
        contentB: '둘둘',
        contentC: '삼삼',
        edited: false,
        editedDate: null,
      })
    );
    await Multi.update.mockReturnValue(
      Promise.resolve({
        title: '제목',
        description: '내용',
        contentA: '하나하나',
        contentB: '둘둘',
        contentC: '삼삼',
        edited: false,
        editedDate: null,
      })
    );
    await editMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('객관식 게시글 수정 DB 에러 발생', async () => {
    const err = 'DB에러';
    await Multi.findOne.mockRejectedValue(err);
    await Multi.update.mockRejectedValue(err);
    await editMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
