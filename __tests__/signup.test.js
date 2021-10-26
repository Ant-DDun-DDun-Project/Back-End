describe('회원가입', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('회원가입에 성공하면 response로 success:true를 보낸다.', async () => {
    const req = {
      body: {
        userId: 'a-sd_f',
        nickname: '황창환',
        pw: 'zxcv',
        pwCheck: 'zxcv',
      },
    };
    await User.findOne.mockReturnValue(null);
    await signup(req, res, next);
    expect(res.status).toBeCalledWith(200);
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
