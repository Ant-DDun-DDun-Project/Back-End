jest.mock('../models/multi');
const Multi = require('../models/multi');
const { mainMulti } = require('../controllers/multi-main');

describe('객관식 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
  const next = jest.fn();

  test('객관식 페이지에 성공적으로 게시물 리스트를 전송하면 / success: true / 와 데이터를 보낸다.', async () => {
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
    await mainMulti(req, res, next);
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
    const err = 'DB Err'
    Multi.findAll.mockReturnValue(Promise.reject(err));
    await mainMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});