jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
jest.mock('../controllers/utils/attend-count');
jest.mock('../controllers/utils/posting-count');
const { Either, Multi } = require('../models');
const { main } = require('../controllers/main');
const { countPosting } = require('../controllers/utils/posting-count');
const { countAttend } = require('../controllers/utils/attend-count');

describe('메인페이지 뷰', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('메인페이지 접근시 찬반,객관식 랭킹데이터,포스팅 전체 갯수, 투표 참여한 사람 수를 보내줌', async () => {
    await Either.findAll.mockReturnValue(
      Promise.resolve({
        either: [
          {
            eitherId: 1,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
          {
            eitherId: 2,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
        ],
      })
    );
    await Multi.findAll.mockReturnValue(
      Promise.resolve({
        multi: [
          {
            multiId: 1,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
          {
            multiId: 2,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
        ],
      })
    );
    await countPosting.mockReturnValue(200);
    await countAttend.mockReturnValue(12312);
    await main(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      either: {
        either: [
          {
            eitherId: 1,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
          {
            eitherId: 2,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
        ],
      },
      multi: {
        multi: [
          {
            multiId: 1,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
          {
            multiId: 2,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
        ],
      },
      postingNum: 200,
      attendNum: 12312,
    });
  });
  test('DB 에러시 next(err)', async () => {
    const err = 'DB에러';
    await Either.findAll.mockRejectedValue(err);
    await main(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
