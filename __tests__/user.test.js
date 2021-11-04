jest.mock('../models/comments');
jest.mock('../models/users');
jest.mock('../models/multi');
jest.mock('../models/either');
jest.mock('../models/likes');
jest.mock('../models/votes');
jest.mock('../models/child-comments');
jest.mock('../models/comment-likes');
jest.mock('../controllers/utils/password-validation');
const User = require('../models/users');
const {
  signup,
  login,
  CheckDuplicatedId,
  CheckDuplicatedNick,
  logout,
  checkLoginStatus
} = require('../controllers/user');
const { validatePassword } = require('../controllers/utils/password-validation');

const mockdb = {
  id: 1,
  userId: 'a-sd_f',
  pw: '$2b$10$LNSjqODSOQNv0tJC2b0qne/gLwxFKI3WaFTiGuJETnGSCLgfwuvx.',
  nickname: '황창환',
  ageGroup: '20',
  exp: 0,
};

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
    const err = 'DB에러';
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockRejectedValue(err);
    await signup(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('로그인', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  const next = jest.fn();
  test('로그인에 성공하면 response로 success:true와 token을 보낸다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        pw: 'zxcv1234!@',
      },
    };
    await User.findOne.mockReturnValue(mockdb);
    await login(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      nickname: '황창환',
      success: true,
      userId: 1,
    });
  });
  test('로그인에 실패하면 response로 success:false를 보낸다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        pw: 'zxcv',
      },
    };
    await User.findOne.mockReturnValue(mockdb);
    await login(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
    });
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        pw: 'zxcv',
      },
    };
    const err = 'DB에러';
    await User.findOne.mockRejectedValue(err);
    await login(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

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
    const err = 'DB Error';
    User.findOne.mockReturnValue(Promise.reject(err));
    await CheckDuplicatedId(req, res, next);
    expect(next).toBeCalledWith(err);
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
    const err = 'DB 에러';
    User.findOne.mockReturnValue(Promise.reject(err));
    await CheckDuplicatedNick(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
describe('로그아웃', () => {
  const req = {};
  const res = {
    clearCookie: jest.fn(),
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('로그아웃에 성공하면 response로 success:true를 보낸다', async () => {
    await logout(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
});

describe('로그인 상태를 확인', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,

    }
  };
  const next = jest.fn();
  const err = 'DB 에러';

  test('현재 로그인 상태일 경우 / success: true / 와 유저 정보를 보낸다.', async () => {
    await User.findOne.mockReturnValue({
      nickname: 'test'
    });
    await checkLoginStatus(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      user: 1,
      nickname: 'test'
    });
  });

  test('비로그인 상태일 경우 / success: false / 과 401 을 보내준다', async () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      locals: {
        user: 13
      }
    };
    await checkLoginStatus(req, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('현재 로그인 상태이지만 DB에 유저 정보가 존재하지 않는 경우', async () => {
    await User.findOne.mockReturnValue(null);
    await checkLoginStatus(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('DB 에러 발생', async () => {
    User.findOne.mockReturnValue(Promise.reject(err));
    await checkLoginStatus(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});