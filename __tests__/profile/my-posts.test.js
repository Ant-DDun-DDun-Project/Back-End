jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/Multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
jest.mock('sequelize');
const { Either, sequelize, User } = require('../../models');
const { getMyPosts, getMyPolls, editNickname } = require('../../controllers/porfile');

describe('내가 쓴 글', () => {
  const req = {
    params: {
      user_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('프로필 페이지에 들어가면 내가 쓴 글을 출력하고 response로 success:true와 포스팅데이터를 준다.', async () => {
    await Either.findAll.mockReturnValue([
      {
        eitherId: 15,
        user: 1,
        title: 'ff',
        date: '지금',
        edited: true,
        editedDate: null,
        completed: true,
        likeCnt: 0,
      },
    ]);
    await sequelize.query.mockReturnValue([
      {
        multiId: 1,
        user: 1,
        title: 'hi',
        date: '2021-10-27 09:16:20',
        editedDate: null,
        completed: 1,
        likeCnt: 0,
        commentCnt: 2,
      },
      {
        multiId: 2,
        user: 1,
        title: 'hi',
        date: '2021-10-27 09:16:20',
        editedDate: null,
        completed: 0,
        likeCnt: 0,
        commentCnt: 0,
      },
    ]);
    await getMyPosts(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      posts: [
        {
          eitherId: 15,
          user: 1,
          title: 'ff',
          date: '지금',
          edited: true,
          editedDate: null,
          completed: true,
          likeCnt: 0,
        },
        {
          multiId: 1,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          editedDate: null,
          completed: 1,
          likeCnt: 0,
          commentCnt: 2,
        },
        {
          multiId: 2,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          editedDate: null,
          completed: 0,
          likeCnt: 0,
          commentCnt: 0,
        },
      ],
    });
  });
  test('DB 에러(findAll에서 에러)시 next(err) 호출', async () => {
    const err = 'DB 에러';
    await Either.findAll.mockRejectedValue(err);
    await getMyPosts(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러(sequelize.query에서 에러)시 next(err) 호출', async () => {
    const err = 'DB 에러';
    await Either.findAll.mockReturnValue([
      {
        eitherId: 15,
        user: 1,
        title: 'ff',
        date: '지금',
        edited: true,
        editedDate: null,
        completed: true,
        likeCnt: 0,
      },
    ]);
    await sequelize.query.mockRejectedValue(err);
    await getMyPosts(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('내가 참여한 글', () => {
  const req = {
    params: {
      user_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('참여한 글 탭을 누르면 내가 참여한 글을 출력하고 response로 success:true 와 데이터를 준다', async () => {
    await sequelize.query
      .mockReturnValueOnce(
        Promise.resolve([
          {
            eitherId: 7,
            user: 3,
            title: '제목',
            date: '2021-12-50',
            edited: 0,
            editedDate: null,
            completed: 0,
            likeCnt: 0,
          },
        ])
      )
      .mockReturnValueOnce(
        Promise.resolve([
          {
            multiId: 5,
            user: 1,
            title: 'hi',
            date: '2021-10-27 09:16:20',
            edited: 0,
            editedDate: null,
            completed: 0,
            likeCnt: 0,
            commentCnt: 0,
          },
        ])
      );
    await getMyPolls(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      posts: [
        {
          eitherId: 7,
          user: 3,
          title: '제목',
          date: '2021-12-50',
          edited: 0,
          editedDate: null,
          completed: 0,
          likeCnt: 0,
        },
        {
          multiId: 5,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          edited: 0,
          editedDate: null,
          completed: 0,
          likeCnt: 0,
          commentCnt: 0,
        },
      ],
    });
  });
  test('DB 에러시 next(err)', async () => {
    const err = 'DB에러';
    await sequelize.query.mockRejectedValueOnce(err);
    await getMyPolls(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러시 next(err)', async () => {
    const err = 'DB에러';
    await sequelize.query
      .mockReturnValueOnce(
        Promise.resolve([
          {
            eitherId: 7,
            user: 3,
            title: '제목',
            date: '2021-12-50',
            edited: 0,
            editedDate: null,
            completed: 0,
            likeCnt: 0,
          },
        ])
      )
      .mockRejectedValueOnce(err);
    await getMyPolls(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
describe('닉네임 변경', () => {
  const req = {
    params: {
      user_id: 1,
    },
    body: {
      nickname: '황창',
    },
  };
  const res = {
    locals: {
      user: 1,
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  const err = 'DB 에러';
  test('닉네임 변경에 성공하면 response로 success:true 와 바뀐 닉네임을 보내준다', async () => {
    await User.findOne.mockReturnValue(
      Promise.resolve({
        id: 1,
        userId: 1,
        nickname: '황창환',
        ageGroup: 40,
      })
    );
    await User.update.mockReturnValue(
      Promise.resolve({
        id: 1,
        userId: 1,
        nickname: '황창',
        ageGroup: 40,
      })
    );
    await editNickname(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      nickname: '황창',
    });
  });
  test('닉네임을 찾지 못하면 response로 success:false로 보내준다', async () => {
    await User.findOne.mockReturnValue(null);
    await editNickname(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
    });
  });
  test('DB 에러시(findOne 에러) next(err)를 호출한다', async () => {
    await User.findOne.mockRejectedValue(err);
    await editNickname(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러시(findOne 에러) next(err)를 호출한다', async () => {
    await User.findOne.mockReturnValue(
      Promise.resolve({
        id: 1,
        userId: 1,
        nickname: '황창환',
        ageGroup: 40,
      })
    );
    await User.update.mockRejectedValue(err);
    await editNickname(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
