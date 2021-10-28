jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/Multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
jest.mock('sequelize');
const {
  postEither,
  editEither,
  getEither,
  getIngEither,
  getCompleteEither,
  deleteEither,
} = require('../../controllers/either');
const { Either, sequelize } = require('../../models');
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

describe('양자택일 게시물 수정', () => {
  const req = {
    params: {
      either_id: '1',
    },
    body: {
      title: '안녕하세요',
      contentA: '처음뵙겠습니다',
      contentB: '사실 두번째',
      editedDate: '2021-10-27 20:27:23',
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
  test('양자택일 게시물 수정에 성공하면 response로 success:true를 보내준다', async () => {
    await Either.findOne.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '하이',
        contentA: '삼전',
        contentB: '애플',
        date: '2021-10-26 20:27:23',
        edited: false,
        editedDate: null,
      })
    );
    await Either.update.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '안녕하세요',
        contentA: '처음뵙겠습니다',
        contentB: '사실 두번째',
        date: '2021-10-26 20:27:23',
        editedDate: '2021-10-27 20:27:23',
      })
    );
    await editEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('양자택일 게시물이 없으면 response로 success:false를 보내준다', async () => {
    await Either.findOne.mockReturnValue(null);
    await editEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러(findOne) 시 next(err)', async () => {
    const err = 'DB에러';
    await Either.findOne.mockRejectedValue(err);
    await editEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러(update) 시 next(err)', async () => {
    const err = 'DB에러';
    await Either.update.mockRejectedValue(err);
    await editEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

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