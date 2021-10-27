jest.mock('../models/either');
jest.mock('../models/votes');
jest.mock('../models/users');
jest.mock('../models/Multi');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
jest.mock('sequelize');
const { Either, sequelize } = require('../models/');
const { getEither, getIngEither, getCompleteEither } = require('../controllers/either');

describe('양자택일 투표 모두보기', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getEither 시 eitherId, title, contentA,B, date, completed, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    await sequelize.query.mockReturnValue(
      Promise.resolve({
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      })
    );
    await getEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: {
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      },
    });
  });
  test('DB 에러', async () => {
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await getEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('진행중인 양자택일 투표 보기', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getIngEither 시 eitherId, title, contentA,B, date, completed: 0, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    await sequelize.query.mockReturnValue(
      Promise.resolve({
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      })
    );
    await getIngEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: {
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 0,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      },
    });
  });
  test('DB 에러', async () => {
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await getIngEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('종료된 양자택일 투표 보기', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getComepleteEither 시 eitherId, title, contentA,B, date, completed: 1, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    await sequelize.query.mockReturnValue(
      Promise.resolve({
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      })
    );
    await getCompleteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: {
        either: [
          {
            eitherId: 15,
            title: '컴플리트되나?',
            contentA: '되냐?',
            contentB: '되냐고?',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 1,
            voteCntA: 0,
            voteCntB: 0,
            nickname: '황창환',
            voted: null,
          },
          {
            eitherId: 13,
            title: '제목5',
            contentA: '컨1',
            contentB: '컨2',
            date: '2021-12-50',
            completed: 1,
            edited: 0,
            editedDate: null,
            likeCnt: 0,
            user: 9,
            voteCntA: 0,
            voteCntB: 0,
            nickname: 'asdzxz',
            voted: null,
          },
        ],
      },
    });
  });
  test('DB 에러', async () => {
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await getCompleteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
