jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/Multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
jest.mock('sequelize');

const { Multi, sequelize, Like } = require('../../models');
const {
  postMulti,
  editMulti,
  getMulti,
  getIngMulti,
  getCompleteMulti,
  deleteMulti,
  likeMulti,
} = require('../../controllers/multi');

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

  // 객관식 게시글 DB 작성 성공.
  test('객관식 게시글을 성공적으로 작성하면 /success: true/ 를 응답으로 보낸다.', async () => {
    await Multi.create.mockReturnValue(true);
    await postMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
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

describe('객관식 게시물 수정', () => {
  const req = {
    params: {
      multi_id: '1',
    },
    body: {
      title: '제목',
      description: '내용',
      contentA: '예제 A',
      contentB: '예제 B',
      contentC: '예제 C',
      contentD: '예제 D',
      contentE: '예제 E',
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
        contentA: '예제 A',
        contentB: '예제 B',
        contentC: '예제 C',
        contentD: '예제 D',
        contentE: '예제 E',
        edited: false,
        editedDate: null,
      })
    );
    await Multi.update.mockReturnValue(
      Promise.resolve({
        title: '제목',
        description: '내용',
        contentA: '예제 A',
        contentB: '예제 B',
        contentC: '예제 C',
        contentD: '예제 D',
        contentE: '예제 E',
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

// 객관식 페이지 메인
describe('객관식 페이지에서 게시물 리스트 전송에 대한 검사', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  const next = jest.fn();

  test('객관식 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    sequelize.query.mockReturnValue(
      Promise.resolve({
        multi: [
          {
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
            nickname: 'test',
          },
        ],
      })
    );
    await getMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multi: [
          {
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
            nickname: 'test',
          },
        ],
      },
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
    },
  };
  const next = jest.fn();

  test('객관식 진행중 페이지 GET 이 성공적으로 동작하면 / success: true / 와 객관식 게시글 리스트를 보낸다.', async () => {
    sequelize.query.mockReturnValue(
      Promise.resolve({
        multi: [
          {
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
            nickname: 'test',
          },
        ],
      })
    );
    await getIngMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: 'true',
      multi: {
        multi: [
          {
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
            nickname: 'test',
          },
        ],
      },
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
      sequelize.query.mockReturnValue(
        Promise.resolve({
          multi: [
            {
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
              nickname: 'test',
            },
          ],
        })
      );
      await getCompleteMulti(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        success: 'true',
        multi: {
          multi: [
            {
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
              nickname: 'test',
            },
          ],
        },
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

describe('객관식 삭제', () => {
  const req = {
    params: {
      multi_id: '1',
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
  test('객관식 삭제가 성공하면 success:true를 보내준다.', async () => {
    await Multi.findOne.mockReturnValue(
      Promise.resolve({
        title: '제목',
        description: '내용',
        contentA: '예제 A',
        contentB: '예제 B',
        contentC: '예제 C',
        contentD: '예제 D',
        contentE: '예제 E',
        edited: false,
        editedDate: null,
      })
    );
    await Multi.destroy.mockResolvedValue();
    await deleteMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('삭제시 존재하는 객관식을 찾지 못하면 success:false를 보내준다.', async () => {
    await Multi.findOne.mockReturnValue(null);
    await deleteMulti(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('객관식 게시글 삭제 시 DB 에러 발생', async () => {
    const err = 'DB에러';
    await Multi.findOne.mockRejectedValue(err);
    await Multi.update.mockRejectedValue(err);
    await deleteMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

// 객관식 좋아요
describe('객관식 게시글을 좋아요에 대한 검사', () => {
  const req = {
    params: {
      multi_id: '1',
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

  test('객관식 게시글 좋아요에 성공하면 success:true와 likeCnt를 내려준다.', async () => {
    await Like.findOne.mockReturnValue(null);
    await Like.create.mockReturnValue(true);
    await Like.count.mockReturnValue(3);
    await Multi.update.mockReturnValue(true);
    await likeMulti(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true, likeCnt: 3 });
  });

  test('이미 likes 테이블에 있는 경우 success:false를 내려준다.', async () => {
    await Like.findOne.mockReturnValue(true);
    await likeMulti(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('like테이블 조회 시 에러가 난 경우 success: false를 내려준다.', async () => {
    const err = 'db에러';
    await Like.findOne.mockRejectedValue(err);
    await likeMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('like테이블에 로우 생성 시 에러가 난 경우 success: false를 내려준다.', async () => {
    const err = 'db에러';
    await Like.findOne.mockReturnValue(null);
    await Like.create.mockRejectedValue(err);
    await likeMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('객관식 게시글 좋아요에 성공하면 success:true와 likeCnt를 내려준다.', async () => {
    const err = 'db에러';
    await Like.findOne.mockReturnValue(null);
    await Like.create.mockReturnValue(true);
    await Like.count.mockRejectedValue(err);
    await likeMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('객관식 게시글 좋아요에 성공하면 success:true와 likeCnt를 내려준다.', async () => {
    const err = 'db에러';
    await Like.findOne.mockReturnValue(null);
    await Like.create.mockReturnValue(true);
    await Like.count.mockReturnValue(3);
    await Multi.update.mockRejectedValue(err);
    await likeMulti(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
