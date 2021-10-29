jest.mock('../models/either');
jest.mock('../models/votes');
jest.mock('../models/users');
jest.mock('../models/Multi');
jest.mock('../models/likes');
jest.mock('../models/comments');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
jest.mock('sequelize');
const { Either, Multi, sequelize, Like, Vote } = require('../models');
const { searchPosts } = require('../controllers/search');

describe('검색하기', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('검색하기에 성공하면 success: true와 posts를 내려준다', async () => {
    const req = {
      query: {
        keyword: 'test',
      },
    };
    await sequelize.query
      .mockReturnValueOnce([
        {
          eitherId: 1,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          editedDate: null,
          completed: 1,
          likeCnt: 0,
        },
      ])
      .mockReturnValueOnce([
        {
          multiId: 2,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:18',
          editedDate: null,
          completed: 0,
          likeCnt: 0,
          commentCnt: 0,
        },
      ]);
    await searchPosts(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      posts: [
        {
          eitherId: 1,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          editedDate: null,
          completed: 1,
          likeCnt: 0,
        },
        {
          multiId: 2,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:18',
          editedDate: null,
          completed: 0,
          likeCnt: 0,
          commentCnt: 0,
        },
      ],
    });
  });
  test('DB 쿼리 에러시 next(err) 호출', async () => {
    const req = {
      query: {
        keyword: 'test',
      },
    };
    const err = 'DB 에러';
    await sequelize.query.mockRejectedValue(err);
    await searchPosts(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 쿼리 에러시 next(err) 호출', async () => {
    const req = {
      query: {
        keyword: 'test',
      },
    };
    const err = 'DB 에러';
    await sequelize.query.mockReturnValueOnce(true);
    await sequelize.query.mockRejectedValueOnce(err);
    await searchPosts(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 쿼리 에러시 next(err) 호출', async () => {
    const req = {
      query: {
        keyword: '',
      },
    };
    await searchPosts(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
});
