jest.mock('../dist/models');
jest.mock('../dist/controllers/utils/password-validation');
jest.mock('../dist/controllers/utils/create-token');
const { User } = require('../dist/models');
const { default: userControllers } = require('../dist/controllers/user');
const { validatePassword } = require('../dist/controllers/utils/password-validation');
const { createToken } = require('../dist/controllers/utils/create-token');

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
    await userControllers.signUp(req, res, next);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
  test('회원가입 시 아이디 중복테스트에서 성공하지 못하면 response로 success:false와 메세지를 보낸다', async () => {
    await validatePassword.mockReturnValue(true);
    await User.findOne
      .mockReturnValueOnce(
        Promise.resolve({
          userId: 'a-sd_f',
          nickname: '황창환1',
          pw: 'zxcv1234!@',
          confirmPw: 'zxcv1234!@',
          ageGroup: 50,
        })
      )
      .mockReturnValueOnce(null);
    await userControllers.signUp(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
      msg: '중복된 아이디입니다.',
    });
  });
  test('회원가입 시 닉네임 중복테스트에서 성공하지 못하면 response로 success:false와 메세지를 보낸다', async () => {
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockReturnValueOnce(null).mockReturnValueOnce(
      Promise.resolve({
        userId: 'a-sd_f12',
        nickname: '황창환',
        pw: 'zxcv1234!@',
        confirmPw: 'zxcv1234!@',
        ageGroup: 50,
      })
    );
    await userControllers.signUp(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
      msg: '중복된 닉네임입니다.',
    });
  });
  test('회원가입 시 모두 중복테스트에서 성공하지 못하면 response로 success:false와 메세지를 보낸다', async () => {
    await validatePassword.mockReturnValue(true);
    await User.findOne
      .mockReturnValueOnce(
        Promise.resolve({
          userId: 'a-sd_f',
          nickname: '황창환1',
          pw: 'zxcv1234!@',
          confirmPw: 'zxcv1234!@',
          ageGroup: 50,
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          userId: 'a-sd_f12',
          nickname: '황창환',
          pw: 'zxcv1234!@',
          confirmPw: 'zxcv1234!@',
          ageGroup: 50,
        })
      );
    await userControllers.signUp(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      success: false,
      msg: '중복된 아이디입니다.',
    });
  });
  test('회원가입 시 비밀번호와 비밀번호 확인이 다르면 response로 success:false와 메세지를 보낸다.', async () => {
    await validatePassword.mockReturnValue(false);
    await userControllers.signUp(req, res, next);
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
    await userControllers.signUp(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const err = 'DB에러';
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockReturnValueOnce(true).mockRejectedValueOnce(err);
    await userControllers.signUp(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const err = 'DB에러';
    await validatePassword.mockReturnValue(true);
    await User.findOne.mockReturnValue(null);
    await User.create.mockRejectedValue(err);
    await userControllers.signUp(req, res, next);
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
    await createToken.mockReturnValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NTYxNTIzLCJleHAiOjE2Mzc4MjA3MjN9.Zy7IUoP7dmUXbB4VMSMUi6dnRoOM6zxurKLSJc7Dn7M'
    );
    await userControllers.login(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      nickname: '황창환',
      success: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NTYxNTIzLCJleHAiOjE2Mzc4MjA3MjN9.Zy7IUoP7dmUXbB4VMSMUi6dnRoOM6zxurKLSJc7Dn7M',
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
    await userControllers.login(req, res, next);
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
    await userControllers.login(req, res, next);
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
    await userControllers.CheckDuplicatedId(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  // 중복되는 아이디가 존재하는 경우
  test('중복되는 아이디가 존재할 경우 /success: false/ 을 응답으로 보내준다', async () => {
    await User.findOne.mockReturnValue(true);
    await userControllers.CheckDuplicatedId(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  // DB Error가 생겼을 경우
  test('DB에 대한 Error가 발생했을 경우 next', async () => {
    const err = 'DB Error';
    User.findOne.mockReturnValue(Promise.reject(err));
    await userControllers.CheckDuplicatedId(req, res, next);
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
    await userControllers.CheckDuplicatedNick(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  // 중복되는 닉네임이 존재하는 경우
  test('중복되는 닉네임이 존재할 경우 /success: false/ 을 응답으로 보내준다.', async () => {
    await User.findOne.mockReturnValue(true);
    await userControllers.CheckDuplicatedNick(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  // DB Error가 생겼을 경우
  test('DB에 대한 Error가 발생했을 경우 next', async () => {
    const err = 'DB 에러';
    User.findOne.mockReturnValue(Promise.reject(err));
    await userControllers.CheckDuplicatedNick(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
