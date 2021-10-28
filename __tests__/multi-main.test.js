jest.mock('../models/multi');
jest.mock('../models/users');
jest.mock('../models/votes');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/either');
jest.mock('../models/comment-likes');
jest.mock('../models/child-comments');
jest.mock('sequelize');

const { sequelize } = require('../models');
const { getMulti, getIngMulti, getCompleteMulti } = require('../controllers/multi-main');

// 객관식 페이지 메인
describe('객관식 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1
    }
  };
  const next = jest.fn();

  test('객관식 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    sequelize.query.mockReturnValue(Promise.resolve({
      multi: [{
        multi: 1,
        title: '무야호',
        description: '매우 좋다는 의미',
        contentA: '예제 A',
        contentB: '예제 B',
        contentC: '예제 C',
        contentD: '예제 D',
        contentE: '예제 E',
        date: '2021-10-28 10:09:30',
        completed: 0,
        edited: 0,
        editedDated: null,
        likeCnt: 0,
        user: 1,
        voted: 'A',
        liked: null,
        commentCnt: 5,
      }]
    }));
    await getMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multi: [{
          multi: 1,
          title: '무야호',
          description: '매우 좋다는 의미',
          contentA: '예제 A',
          contentB: '예제 B',
          contentC: '예제 C',
          contentD: '예제 D',
          contentE: '예제 E',
          date: '2021-10-28 10:09:30',
          completed: 0,
          edited: 0,
          editedDated: null,
          likeCnt: 0,
          user: 1,
          voted: 'A',
          liked: null,
          commentCnt: 5,
        }]
      }
    });
  });
  test('DB 에러 발생한 경우에 대한 검사', async () => {
    const err = 'DB Err';
    sequelize.query.mockReturnValue(Promise.reject(err));
    await getMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

// 객관식 진행중
describe('객관식 진행중 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    }
  };
  const next = jest.fn();

  test('객관식 진행중 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    sequelize.query.mockReturnValue(Promise.resolve({
      multi: [{
        multi: 1,
        title: '무야호',
        description: '매우 좋다는 의미',
        contentA: '예제 A',
        contentB: '예제 B',
        contentC: '예제 C',
        contentD: '예제 D',
        contentE: '예제 E',
        date: '2021-10-28 10:09:30',
        completed: 0,
        edited: 0,
        editedDated: null,
        likeCnt: 0,
        user: 1,
        voted: 'A',
        liked: null,
        commentCnt: 5,
      }]
    }));
    await getIngMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multi: [{
          multi: 1,
          title: '무야호',
          description: '매우 좋다는 의미',
          contentA: '예제 A',
          contentB: '예제 B',
          contentC: '예제 C',
          contentD: '예제 D',
          contentE: '예제 E',
          date: '2021-10-28 10:09:30',
          completed: 0,
          edited: 0,
          editedDated: null,
          likeCnt: 0,
          user: 1,
          voted: 'A',
          liked: null,
          commentCnt: 5,
        }]
      }
    });
  });
  test('DB 에러 발생한 경우에 대한 검사', async () => {
    const err = 'DB Err';
    sequelize.query.mockReturnValue(Promise.reject(err));
    await getIngMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  // 객관식 완료 페이지
  describe('객관식 완료된 페이지에서 게시물 리스트 전송에 대한 검사', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();
    test('객관식 완료된 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
      sequelize.query.mockReturnValue(Promise.resolve({
        multi: [{
          multi: 1,
          title: '무야호',
          description: '매우 좋다는 의미',
          contentA: '예제 A',
          contentB: '예제 B',
          contentC: '예제 C',
          contentD: '예제 D',
          contentE: '예제 E',
          date: '2021-10-28 10:09:30',
          completed: 0,
          edited: 0,
          editedDated: null,
          likeCnt: 0,
          user: 1,
          voted: 'A',
          liked: null,
          commentCnt: 5,
        }]
      }));
      await getCompleteMulti(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        success: 'true',
        multi: {
          multi: [{
            multi: 1,
            title: '무야호',
            description: '매우 좋다는 의미',
            contentA: '예제 A',
            contentB: '예제 B',
            contentC: '예제 C',
            contentD: '예제 D',
            contentE: '예제 E',
            date: '2021-10-28 10:09:30',
            completed: 0,
            edited: 0,
            editedDated: null,
            likeCnt: 0,
            user: 1,
            voted: 'A',
            liked: null,
            commentCnt: 5,
          }]
        }
      });
    });

    test('DB 에러 발생한 경우에 대한 검사', async () => {
      const err = 'DB Err';
      sequelize.query.mockReturnValue(Promise.reject(err));
      await getCompleteMulti(req, res, next);
      expect(next).toBeCalledWith(err);
    });
  });

});