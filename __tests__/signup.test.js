jest.mock('../models/users');
const User = require('../models/users');
const { signup } = require('../controllers/signup');
jest.mock('../controllers/utils/password-validation');
const { validatePassword } = require('../controllers/utils/password-validation');

describe('회원가입', () => {
  let req = {
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
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockReturnValue(null);
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
  test('회원가입 시 중복테스트에서 성공하지 못하면 response로 success:false와 메세지를 보낸다', async () => {
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockReturnValue(
      Promise.resolve({
        userId: 'a-sd_f',
        nickname: '황창환',
        pw: 'zxcv1234!@',
        confirmPw: 'zxcv1234!@',
        ageGroup: 50,
      })
    );
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
      msg: '중복된 아이디입니다.',
    });
  });
  test('회원가입 시 비밀번호와 비밀번호 확인이 다르면 response로 success:false와 메세지를 보낸다.', async () => {
    await validatePassword.mockReturnValue(false);
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
      msg: '비밀번호를 확인해주세요.',
    });
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const error = 'DB에러';
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockRejectedValue(error);
    await signup(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
