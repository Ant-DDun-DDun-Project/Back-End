jest.mock('../models/users');
const User = require('../models/users');
const { signup } = require('../controllers/signup');

describe('회원가입', () => {
  const req = {
    body: {
      userId: 'a-sd_f',
      nickname: '황창환',
      pw: 'zxcv1234!@',
      confirmPw: 'zxcv1234!@',
      ageGroup: 50,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('회원가입에 성공하면 response로 success:true를 보낸다.', async () => {
    await User.findOne.mockReturnValue(null);
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const error = 'DB에러';
    await User.findOne.mockRejectedValue(error);
    await signup(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
