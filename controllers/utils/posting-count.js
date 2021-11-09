const { Either, Multi } = require('../../models');

exports.countPosting = async () => {
  //포스팅 갯수 카운트 함수
  try {
    const [either, multi] = await Promise.all([Either.findAll(), Multi.findAll()]);
    const eitherCnt = either.length;
    const multiCnt = multi.length;
    return [eitherCnt, multiCnt];
  } catch (err) {
    console.error(err);
  }
};
