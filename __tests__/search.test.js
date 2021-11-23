jest.mock('../dist/models');
const { sequelize } = require('../dist/models');
const { default: searchControllers } = require('../dist/controllers/search');

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
          completed: 0,
          likeCnt: 0,
          commentCnt: 0,
        },
      ]);
    await searchControllers.searchPosts(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      posts: [
        {
          eitherId: 1,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:20',
          completed: 1,
          likeCnt: 0,
        },
        {
          multiId: 2,
          user: 1,
          title: 'hi',
          date: '2021-10-27 09:16:18',
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
    await searchControllers.searchPosts(req, res, next);
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
    await searchControllers.searchPosts(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 쿼리 에러시 next(err) 호출', async () => {
    const req = {
      query: {
        keyword: '',
      },
    };
    await searchControllers.searchPosts(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
});
