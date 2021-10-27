jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
const { deleteEither } = require('../controllers/either');
const { Either } = require('../models');

describe('양자택일 삭제', () => {
  const req = {
    params: {
      either_id: '1',
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
  test('삭제가 성공하면 response로 success:true를 보내준다.', async () => {
    await Either.findOne.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '하이',
        contentA: '삼전',
        contentB: '애플',
        date: '2021-10-26 20:27:23',
        edited: false,
        editDate: null,
      })
    );
    await Either.destroy.mockResolvedValue();
    await deleteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('삭제 시 Either를 찾지 못하면 response로 success:false를 보내준다.', async () => {
    await Either.findOne.mockReturnValue(null);
    await deleteEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러 시 next(err)를 호출한다', async () => {
    const err = 'DB에러';
    await Either.findOne.mockRejectedValue(err);
    await Either.destroy.mockRejectedValue(err);
    await deleteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
