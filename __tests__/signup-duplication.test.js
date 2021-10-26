jest.mock('../models/users');
const User = require('../models/users');
const { CheckDuplicatedId, CheckDuplicatedNick } = require('../controllers/signup-duplication');

// 회원가입 시 아이디 중복체크
describe('회원가입 시 아이디 중복체크 기능에 대한 검사', () => {
  const req = {
    body: { userId: 'test_id' },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  // 중복된 아이디가 없을 때
  test('중복되는 아이디가 없을 경우 /success:true/ 를 응답으로 보내준다.', async () => {
    await User.findOne.mockReturnValue(null);
    await CheckDuplicatedId(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  // 중복되는 아이디가 존재하는 경우
  test('중복되는 아이디가 존재할 경우 /success: false/ 을 응답으로 보내준다', async () => {
    await User.findOne.mockReturnValue(true);
    await CheckDuplicatedId(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  // DB Error가 생겼을 경우
  test('DB에 대한 Error가 발생했을 경우 next', async () => {
    const error = 'DB Error';
    User.findOne.mockReturnValue(Promise.reject(error));
    await CheckDuplicatedId(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});

// 회원가입 시 닉네임 중복체크
describe('회원가입 시 닉네임 중복체크 기능에 대한 검사', () => {
  const req = {
    body: { nickname: 'BadBoy' },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  // 중복되는 닉네임이 없을 경우
  test('중복되는 닉네임이 없을 경우 /success: true/ 을 응답으로 보내준다.', async () => {
    await User.findOne.mockReturnValue(null);
    await CheckDuplicatedNick(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  // 중복되는 닉네임이 존재하는 경우
  test('중복되는 닉네임이 존재할 경우 /success: false/ 을 응답으로 보내준다.', async () => {
    await User.findOne.mockReturnValue(true);
    await CheckDuplicatedNick(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  // DB Error가 생겼을 경우
  test('DB에 대한 Error가 발생했을 경우 next', async () => {
    const error = 'DB Error';
    User.findOne.mockReturnValue(Promise.reject(error));
    await CheckDuplicatedNick(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
