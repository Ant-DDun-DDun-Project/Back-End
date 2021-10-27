jest.mock('../models/either');
const { editEither } = require('../controllers/either');
const { Either } = require('../models');

describe('양자택일 게시물 수정', () => {
  const req = {
    params: {
      either_id: '1',
    },
    body: {
      title: '안녕하세요',
      contentA: '처음뵙겠습니다',
      contentB: '사실 두번째',
      editDate: '2021-10-27 20:27:23',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('양자택일 게시물 수정에 성공하면 response로 success:true를 보내준다', async () => {
    await Either.findOne.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '하이',
        contentA: '삼전',
        contentB: '애플',
        date: '2021-10-26 20:27:23',
        editDate: null,
      })
    );
    await Either.update.mockReturnValue(
      Promise.resolve({
        eitherId: '1',
        title: '안녕하세요',
        contentA: '처음뵙겠습니다',
        contentB: '사실 두번째',
        date: '2021-10-26 20:27:23',
        editDate: '2021-10-27 20:27:23',
      })
    );
    editEither(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('DB 에러 시 next(err)', async () => {
    const err = 'DB에러';
    await Either.findOne.mockRejectedValue(err);
    await Either.update.mockRejectedValue(err);
    await getMain(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
