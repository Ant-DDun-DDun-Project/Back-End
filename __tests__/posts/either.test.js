jest.mock('../../dist/models');
jest.mock('../../dist/controllers/utils/sort-posts');
const { default: eitherControllers } = require('../../dist/controllers/either');
const { sortEither } = require('../../dist/controllers/utils/sort-posts');
const { Either, sequelize, Like, Vote } = require('../../dist/models');

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
    },
  };
  const next = jest.fn();

  test('양자택일 게시글 작성에 성공하면 response로 success:true를 보낸다.', async () => {
    await Either.create.mockReturnValue(true);
    await eitherControllers.postEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('객관식 게시글 작성 시 DB 에러 발생', async () => {
    const err = 'DB에러';
    await Either.create.mockRejectedValue(err);
    await eitherControllers.postEither(req, res, next);
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
    await Either.findOne.mockReturnValueOnce(
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
    await Vote.findOne.mockReturnValueOnce(null);
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
    await eitherControllers.editEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('이미 투표를 했으면 수정에 실패하고 response로 success:false를 보내준다.', async () => {
    await Either.findOne.mockReturnValueOnce(
      Promise.resolve({
        eitherId: '1',
        title: '하이',
        contentA: '삼전',
        contentB: '애플',
        date: '2021-10-26 20:27:23',
        edited: false,
        editedDate: null,
        user: 1,
      })
    );
    await Vote.findOne.mockReturnValueOnce({
      id: 1,
      vote: 'A',
      user: 1,
      either: 1,
      multi: null,
    });
    await Either.update.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '안녕하세요',
        contentA: '처음뵙겠습니다',
        contentB: '사실 두번째',
        date: '2021-10-26 20:27:23',
        editedDate: '2021-10-27 20:27:23',
        user: 1,
      })
    );
    await eitherControllers.editEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('양자택일 게시물이 없으면 response로 success:false를 보내준다', async () => {
    await Either.findOne.mockReturnValue(null);
    await eitherControllers.editEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러(findOne) 시 next(err)', async () => {
    const err = 'DB에러';
    await Either.findOne.mockRejectedValue(err);
    await eitherControllers.editEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러(update) 시 next(err)', async () => {
    const err = 'DB에러';
    await Either.update.mockRejectedValue(err);
    await eitherControllers.editEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('양자택일 투표 모두보기', () => {
  const res = {
    locals: {
      user: 1,
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getEither 시 eitherId, title, contentA,B, date, completed, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
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
    await eitherControllers.getEither(req, res, next);
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
  test('뒤로가기를 통해 찬반투표 페이지로 넘어가면 response로 success:true 와 either 데이터를 보내준다.', async () => {
    const req = {
      params: {
        either_id: 7,
      },
    };
    await sequelize.query.mockReturnValue([
      {
        eitherId: 9,
        title: 'gg',
        contentA: 'ss',
        contentB: 'ee',
        date: '2021-11-06 16:59:54',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 0,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
      {
        eitherId: 8,
        title: '점심 뭐 먹지',
        contentA: '햄버거',
        contentB: '피자',
        date: '2021-11-06 15:31:57',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 1,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
      {
        eitherId: 7,
        title: '꽁돈 생겼다~  뭐 살까?',
        contentA: '카카오',
        contentB: '네이버',
        date: '2021-11-06 01:42:32',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 1,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
    ]);
    await sortEither.mockReturnValue([
      {
        eitherId: 7,
        title: '꽁돈 생겼다~  뭐 살까?',
        contentA: '카카오',
        contentB: '네이버',
        date: '2021-11-06 01:42:32',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 1,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
      {
        eitherId: 9,
        title: 'gg',
        contentA: 'ss',
        contentB: 'ee',
        date: '2021-11-06 16:59:54',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 0,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
      {
        eitherId: 8,
        title: '점심 뭐 먹지',
        contentA: '햄버거',
        contentB: '피자',
        date: '2021-11-06 15:31:57',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 1,
        liked: null,
        nickname: 'Ant_man',
        voted: null,
      },
    ]);
    await eitherControllers.getEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: [
        {
          eitherId: 7,
          title: '꽁돈 생겼다~  뭐 살까?',
          contentA: '카카오',
          contentB: '네이버',
          date: '2021-11-06 01:42:32',
          completed: 0,
          edited: 0,
          editedDate: null,
          likeCnt: 1,
          user: 19,
          voteCntA: 1,
          voteCntB: 1,
          liked: null,
          nickname: 'Ant_man',
          voted: null,
        },
        {
          eitherId: 9,
          title: 'gg',
          contentA: 'ss',
          contentB: 'ee',
          date: '2021-11-06 16:59:54',
          completed: 0,
          edited: 0,
          editedDate: null,
          likeCnt: 0,
          user: 19,
          voteCntA: 0,
          voteCntB: 0,
          liked: null,
          nickname: 'Ant_man',
          voted: null,
        },
        {
          eitherId: 8,
          title: '점심 뭐 먹지',
          contentA: '햄버거',
          contentB: '피자',
          date: '2021-11-06 15:31:57',
          completed: 1,
          edited: 0,
          editedDate: null,
          likeCnt: 0,
          user: 19,
          voteCntA: 0,
          voteCntB: 1,
          liked: null,
          nickname: 'Ant_man',
          voted: null,
        },
      ],
    });
  });
  test('DB 에러', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await eitherControllers.getEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('진행중인 양자택일 투표 보기', () => {
  const res = {
    locals: {
      user: 1,
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getIngEither 시 eitherId, title, contentA,B, date, completed: 0, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
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
    await eitherControllers.getIngEither(req, res, next);
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
  test('뒤로가기로 진행중인 양자택일로 가면 response로 success:true와 either 데이터를 보내준다.', async () => {
    const req = {
      params: {
        either_id: 7,
      },
    };
    await sequelize.query.mockReturnValue([
      {
        eitherId: 9,
        title: 'gg',
        contentA: 'ss',
        contentB: 'ee',
        date: '2021-11-06 16:59:54',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 0,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
      {
        eitherId: 7,
        title: '꽁돈 생겼다~  뭐 살까?',
        contentA: '카카오',
        contentB: '네이버',
        date: '2021-11-06 01:42:32',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 1,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
    ]);
    await sortEither.mockReturnValue([
      {
        eitherId: 7,
        title: '꽁돈 생겼다~  뭐 살까?',
        contentA: '카카오',
        contentB: '네이버',
        date: '2021-11-06 01:42:32',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 1,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
      {
        eitherId: 9,
        title: 'gg',
        contentA: 'ss',
        contentB: 'ee',
        date: '2021-11-06 16:59:54',
        completed: 0,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 0,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
    ]);
    await eitherControllers.getIngEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: [
        {
          eitherId: 7,
          title: '꽁돈 생겼다~  뭐 살까?',
          contentA: '카카오',
          contentB: '네이버',
          date: '2021-11-06 01:42:32',
          completed: 0,
          edited: 0,
          editedDate: null,
          likeCnt: 1,
          user: 19,
          voteCntA: 1,
          voteCntB: 1,
          nickname: 'Ant_man',
          liked: null,
          voted: null,
        },
        {
          eitherId: 9,
          title: 'gg',
          contentA: 'ss',
          contentB: 'ee',
          date: '2021-11-06 16:59:54',
          completed: 0,
          edited: 0,
          editedDate: null,
          likeCnt: 0,
          user: 19,
          voteCntA: 0,
          voteCntB: 0,
          nickname: 'Ant_man',
          liked: null,
          voted: null,
        },
      ],
    });
  });
  test('DB 에러', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await eitherControllers.getIngEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('종료된 양자택일 투표 보기', () => {
  const res = {
    locals: {
      user: '1',
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('getComepleteEither 시 eitherId, title, contentA,B, date, completed: 1, edited(date), likeCnt, user, voteCntA,B, nickname, voted 내려줌', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
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
    await eitherControllers.getCompleteEither(req, res, next);
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
  test('뒤로가기로 종료된 페이지로 가면 response로 success:true 와 either 데이터를 보내준다.', async () => {
    const req = {
      params: {
        either_id: 8,
      },
    };
    await sequelize.query.mockReturnValue([
      {
        eitherId: 10,
        title: 'qq',
        contentA: 'qq',
        contentB: 'qq',
        date: '2021-11-06 20:15:46',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 1,
        voteCntA: 0,
        voteCntB: 0,
        nickname: '황창환 ',
        liked: null,
        voted: null,
      },
      {
        eitherId: 8,
        title: '점심 뭐 먹지',
        contentA: '햄버거',
        contentB: '피자',
        date: '2021-11-06 15:31:57',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 1,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
      {
        eitherId: 6,
        title: '콘솔게임',
        contentA: '플스',
        contentB: '액박',
        date: '2021-11-06 01:35:31',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 0,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
    ]);
    await sortEither.mockReturnValue([
      {
        eitherId: 8,
        title: '점심 뭐 먹지',
        contentA: '햄버거',
        contentB: '피자',
        date: '2021-11-06 15:31:57',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 19,
        voteCntA: 0,
        voteCntB: 1,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
      {
        eitherId: 6,
        title: '콘솔게임',
        contentA: '플스',
        contentB: '액박',
        date: '2021-11-06 01:35:31',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 1,
        user: 19,
        voteCntA: 1,
        voteCntB: 0,
        nickname: 'Ant_man',
        liked: null,
        voted: null,
      },
      {
        eitherId: 10,
        title: 'qq',
        contentA: 'qq',
        contentB: 'qq',
        date: '2021-11-06 20:15:46',
        completed: 1,
        edited: 0,
        editedDate: null,
        likeCnt: 0,
        user: 1,
        voteCntA: 0,
        voteCntB: 0,
        nickname: '황창환 ',
        liked: null,
        voted: null,
      },
    ]);
    await eitherControllers.getCompleteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: [
        {
          eitherId: 8,
          title: '점심 뭐 먹지',
          contentA: '햄버거',
          contentB: '피자',
          date: '2021-11-06 15:31:57',
          completed: 1,
          edited: 0,
          editedDate: null,
          likeCnt: 0,
          user: 19,
          voteCntA: 0,
          voteCntB: 1,
          nickname: 'Ant_man',
          liked: null,
          voted: null,
        },
        {
          eitherId: 6,
          title: '콘솔게임',
          contentA: '플스',
          contentB: '액박',
          date: '2021-11-06 01:35:31',
          completed: 1,
          edited: 0,
          editedDate: null,
          likeCnt: 1,
          user: 19,
          voteCntA: 1,
          voteCntB: 0,
          nickname: 'Ant_man',
          liked: null,
          voted: null,
        },
        {
          eitherId: 10,
          title: 'qq',
          contentA: 'qq',
          contentB: 'qq',
          date: '2021-11-06 20:15:46',
          completed: 1,
          edited: 0,
          editedDate: null,
          likeCnt: 0,
          user: 1,
          voteCntA: 0,
          voteCntB: 0,
          nickname: '황창환 ',
          liked: null,
          voted: null,
        },
      ],
    });
  });
  test('DB 에러', async () => {
    const req = {
      params: {
        either_id: 'all',
      },
    };
    const err = 'DB에러';
    await sequelize.query.mockRejectedValue(err);
    await eitherControllers.getCompleteEither(req, res, next);
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
    await eitherControllers.deleteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('삭제 시 Either를 찾지 못하면 response로 success:false를 보내준다.', async () => {
    await Either.findOne.mockReturnValue(null);
    await eitherControllers.deleteEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러 시 next(err)를 호출한다', async () => {
    const err = 'DB에러';
    await Either.findOne.mockRejectedValue(err);
    await Either.destroy.mockRejectedValue(err);
    await eitherControllers.deleteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('찬반 투표 좋아요에 대한 검사', () => {
  const req = {
    params: {
      either_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    },
  };
  const next = jest.fn();
  const err = 'DB error';

  test('찬반 투표 좋아요 이벤트를 성공적으로 수행하면 / success: true , likeCnt / 를 응답으로 보낸다.', async () => {
    await Like.findOne.mockReturnValue(false); // 해당 게시물에 투표한 이력이 없는 경우
    await Like.create.mockReturnValue(true); // 해당 게시물에 투표 이력을 추가 한다.
    await Like.count.mockReturnValue(1); // 해당 게시물의 좋아요 갯수를 구한다.
    await Either.update.mockReturnValue(true); // 찬반 투표 해당 게시물의 likeCnt 수정 작업
    await eitherControllers.likeEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      likeCnt: 1,
    });
  });
  test('찬반 투표 좋아요를 수행한 이력이 존재하면 / success: false / 를 응답으로 보낸다', async () => {
    await Like.findOne.mockReturnValue(true);
    await eitherControllers.likeEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
    });
  });

  test('DB Error 동작 -> Like.findOne', async () => {
    Like.findOne.mockReturnValue(Promise.reject(err));
    await eitherControllers.likeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 -> Like.create', async () => {
    await Like.findOne.mockReturnValue(false);
    Like.create.mockReturnValue(Promise.reject(err));
    await eitherControllers.likeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 -> Like.count', async () => {
    await Like.findOne.mockReturnValue(false);
    await Like.create.mockReturnValue(true);
    Like.count.mockReturnValue(Promise.reject(err));
    await eitherControllers.likeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 -> Either.update', async () => {
    await Like.findOne.mockReturnValue(false);
    await Like.create.mockReturnValue(true);
    await Like.count.mockReturnValue(1);
    Either.update.mockReturnValue(Promise.resolve(err));
    await eitherControllers.likeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('찬반 투표에 대한 검사', () => {
  const req = {
    body: {
      vote: 'A',
    },
    params: {
      either_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    },
  };
  const next = jest.fn();
  const err = 'DB Error';

  test('찬반 투표를 성공적으로 수행한다면 / success: true / 를 응답으로 보낸다.', async () => {
    await Vote.findOne.mockReturnValue(null);
    await Vote.create.mockReturnValue(true);
    await Vote.count.mockReturnValueOnce(4).mockReturnValueOnce(10);
    await eitherControllers.voteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: 1,
      vote: 'A',
      voteCntA: 4,
      voteCntB: 10,
    });
  });

  test('찬반 투표 경력이 이미 존재한다면 / success: false / 와 status 400 응답을 보낸다.', async () => {
    await Vote.findOne.mockReturnValue(true);
    await Vote.update.mockReturnValue(true);
    await Vote.count.mockReturnValueOnce(4).mockReturnValueOnce(10);
    await eitherControllers.voteEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      either: 1,
      vote: 'A',
      voteCntA: 4,
      voteCntB: 10,
    });
  });

  test('DB Error 동작 --> Vote.findOne', async () => {
    Vote.findOne.mockReturnValue(Promise.reject(err));
    await eitherControllers.voteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 --> Vote.create', async () => {
    await Vote.findOne.mockReturnValue(null);
    Vote.create.mockReturnValue(Promise.reject(err));
    await eitherControllers.voteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 --> Vote.count (cntA)', async () => {
    await Vote.findOne.mockReturnValue(null);
    await Vote.create.mockReturnValue(true);
    Vote.count.mockReturnValue(err);
    await eitherControllers.voteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 동작 --> Vote.count (cntB)', async () => {
    await Vote.findOne.mockReturnValue(null);
    await Vote.create.mockReturnValue(true);
    Vote.count.mockReturnValueOnce(Promise.resolve(true)).mockReturnValueOnce(Promise.reject(err));
    await eitherControllers.voteEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('찬반 게시물 종료하기 검사', () => {
  const req = {
    params: {
      either_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    },
  };
  const next = jest.fn();
  const err = 'DB error';

  test('작성자가 성공적으로 찬반투표 게시물을 투표를 종료하였을 경우 / success: true / 를 응답으로 보내준다.', async () => {
    await Either.findOne.mockReturnValue(true);
    await Either.update.mockReturnValue(true);
    await eitherControllers.completeEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('작성자가 이미 투표 종료를 했을 경우 / success: false/ 를 응답으로 보내준다.', async () => {
    await Either.findOne.mockReturnValue(null);
    await eitherControllers.completeEither(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('DB Error 발생 --> Either.findOne', async () => {
    Either.findOne.mockReturnValue(Promise.reject(err));
    await eitherControllers.completeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB Error 발생 --> Either.update', async () => {
    await Either.findOne.mockReturnValue(true);
    Either.update.mockReturnValue(Promise.reject(err));
    await eitherControllers.completeEither(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
