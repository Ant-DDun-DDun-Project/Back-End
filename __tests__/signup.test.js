describe('회원가입', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('회원가입시 아이디는 영어 대소문자, 숫자만 가능하다.', async () => {
    const req = {
      body: {
        userId: 'asdf',
        nickname: '황창환',
        pw: 'zxcv',
        pwChekc: 'zxcv',
      },
    };
    await User.findOne.mockReturnValue(null);
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
  // test('회원가입시 중복아이디일 경우 response로 success:false을 보낸다', async () => {
  //   const req = {
  //     body: {
  //       userId: 'asdf',
  //     },
  //   };
  //   User.findOne.mockReturnValue(
  //     Promise.resolve({
  //       userId: 'asdf',
  //       nickname: '황창환',
  //       pw: 'asdfasd47354suofyfofor3zsdcvwedarff123',
  //       ageGroup: 30,
  //       exp: 0,
  //     })
  //   );
  //   await signup(req, res, next);
  //   expect(res.status).toBeCalledWith(400);
  //   expect(res.json).toBeCalledWith({
  //     success: false,
  //     msg: '중복된 아이디입니다.',
  //   });
  // });
  test('DB에서 에러가 날 경우 에러핸들러로 넘긴다.', async () => {
    const error = 'DB에러';
    await User.findOne.mockRejectedValue(error);
    await signup(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
