jest.mock('../models/multi');
const Multi = require('../models/multi');
const { postMulti } = require('../controllers/multi-post');

describe('객관식 게시글을 작성에 대한 검사', () => {
  const req = {
    body: {
      title: '예시입니다.',
      description: '예시 항목입니다.',
      contentA: '예시 A',
      contentB: '예시 B',
      contentC: '예시 C',
      contentD: '예시 D',
      contentE: '예시 E',
      date: '2021-10-26',
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 'testId',
    }
  };
  const next = jest.fn();

  // 객관식 게시글 DB 작성 성공.
  test('객관식 게시글을 성공적으로 작성하면 /success: true/ 를 응답으로 보낸다.', async () => {
    await Multi.create.mockReturnValue(true);
    await postMulti(req, res, next);
    //expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  // 객관식 게시글 DB 작성에 대한 에러 catch 문
  test('객관식 게시글 작성 시 DB 에러 발생', async () => {
    const err = 'DB Error';
    Multi.create.mockReturnValue(Promise.reject(err));
    await postMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});