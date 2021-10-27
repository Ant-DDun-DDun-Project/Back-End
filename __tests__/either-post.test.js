jest.mock('../models/either');
jest.mock('../models/votes');
jest.mock('../models/users');
jest.mock('../models/Multi');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
const Either = require('../models/either');
const { postEither } = require('../controllers/either');

describe('양자택일 게시글 작성 테스트', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  const req = {
    body: {
      title: '저메추',
      contentA: '김밥',
      contentB: '치킨',
      date: '2021-10-26 10:24:23',
    },
  };
  const next = jest.fn();

  test('양자택일 게시글 작성에 성공하면 response로 success:true를 보낸다.', async () => {
    await Either.create.mockReturnValue(true);
    await postEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('객관식 게시글 작성 시 DB 에러 발생', async () => {
    const err = 'DB에러';
    await Either.create.mockRejectedValue(err);
    await postEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
