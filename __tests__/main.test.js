const { Either, Multi } = require('../models');

describe('메인페이지 뷰', () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('메인페이지 접근시 찬반,객관식 랭킹데이터,포스팅 전체 갯수, 투표 참여한 사람 수를 보내줌', async () => {
    const either = await Either.findAll.mockReturnValue(
      Promise.resolve({
        either: [
          {
            eitherId: 1,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
          {
            eitherId: 2,
            userNick: 'hwang',
            title: '삼전 9층인데 괜찮을까요',
          },
        ],
      })
    );
    const multi = await Multi.findAll.mockReturnValue(
      Promise.resolve({
        multi: [
          {
            multiId: 1,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
          {
            multiId: 2,
            userNick: 'hwang',
            title: '삼전은',
            description: '최고야',
          },
        ],
      })
    );
    const postingNum = await getPostingNum.mockReturnValue(200);
    const attendNum = await getAttendNum.mockReturnValue(12312);
    main(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ either, multi, postingNum, attendNum });
  });
});
