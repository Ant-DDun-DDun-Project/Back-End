jest.mock('../models/users');
const User = require('../models/users');

describe('로그인', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('로그인에 성공하면 response로 success:true와 token을 보낸다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        pw: 'zxcv',
      },
    };
    await User.findOne.mockReturnValue(null);
    await login(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      token,
    });
  });
  test('로그인에 실패하면 response로 success:false를 보낸다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        pw: 'zxcv',
      },
    };
    await User.findOne.mockReturnValue(null);
    await login(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
    });
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const error = 'DB에러';
    await User.findOne.mockRejectedValue(error);
    await login(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
