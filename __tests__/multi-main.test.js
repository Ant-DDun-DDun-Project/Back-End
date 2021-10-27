jest.mock('../models/multi');
const Multi = require('../models/multi');
const { getMulti, getIngMulti, getCompleteMulti } = require('../controllers/multi-main');

describe('객관식 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
  const next = jest.fn();

  test('객관식 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    Multi.findAll.mockReturnValue(Promise.resolve({
      multiId: 1,
      user: 1,
      title: '제목입니다.',
      description: '내용입니다.',
      date: '2021-10-22 10:15:55',
      editedDate: null,
      completed: false,
      likeCnt: 0,
      Comments: [{
        commentCnt: 3,
      }],
      Votes: [{
        voted: 'A',
      }],
      Likes: [{
        liked: 1
      }],
    }));
    await getMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multiId: 1,
        user: 1,
        title: '제목입니다.',
        description: '내용입니다.',
        date: '2021-10-22 10:15:55',
        editedDate: null,
        completed: false,
        likeCnt: 0,
        Comments: [{
          commentCnt: 3,
        }],
        Votes: [{
          voted: 'A',
        }],
        Likes: [{
          liked: 1,
        }],
      }
    });
  });
  test('DB 에러 발생한 경우에 대한 검사', async () => {
    const err = 'DB Err';
    Multi.findAll.mockReturnValue(Promise.reject(err));
    await getMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('객관식 진행중 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test('객관식 진행중 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    Multi.findAll.mockReturnValue(Promise.resolve({
      multiId: 1,
      user: 1,
      title: '제목입니다.',
      description: '내용입니다.',
      date: '2021-10-22 10:15:55',
      editedDate: null,
      completed: false,
      likeCnt: 0,
      Comments: [{
        commentCnt: 3,
      }],
      Votes: [{
        voted: 'A',
      }],
      Likes: [{
        liked: 1
      }],
    }));
    await getIngMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multiId: 1,
        user: 1,
        title: '제목입니다.',
        description: '내용입니다.',
        date: '2021-10-22 10:15:55',
        editedDate: null,
        completed: false,
        likeCnt: 0,
        Comments: [{
          commentCnt: 3,
        }],
        Votes: [{
          voted: 'A',
        }],
        Likes: [{
          liked: 1
        }],
      }
    });
  });
  test('DB 에러 발생한 경우에 대한 검사', async () => {
    const err = 'DB Err';
    Multi.findAll.mockReturnValue(Promise.reject(err));
    await getIngMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  describe('객관식 진행중 페이지에서 게시물 리스트 전송에 대한 검사', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();
    test('객관식 완료된 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
      Multi.findAll.mockReturnValue(Promise.resolve({
        multiId: 1,
        user: 1,
        title: '제목입니다.',
        description: '내용입니다.',
        date: '2021-10-22 10:15:55',
        editedDate: null,
        completed: true,
        likeCnt: 0,
        Comments: [{
          commentCnt: 3,
        }],
        Votes: [{
          voted: 'A',
        }],
        Likes: [{
          liked: 1
        }],
      }));
      await getCompleteMulti(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        success: 'true',
        multi: {
          multiId: 1,
          user: 1,
          title: '제목입니다.',
          description: '내용입니다.',
          date: '2021-10-22 10:15:55',
          editedDate: null,
          completed: true,
          likeCnt: 0,
          Comments: [{
            commentCnt: 3,
          }],
          Votes: [{
            voted: 'A',
          }],
          Likes: [{
            liked: 1
          }],
        }
      })
    });

    test('DB 에러 발생한 경우에 대한 검사', async () => {
      const err = 'DB Err';
      Multi.findAll.mockReturnValue(Promise.reject(err));
      await getCompleteMulti(req, res, next);
      expect(next).toBeCalledWith(err);
    });
  });

});