const { Either, Multi } = require('../../models');

//포스팅 갯수 카운트 함수
exports.countPosting = async () => {
  const [either, multi] = await Promise.all([Either.findAll(), Multi.findAll()]);
  const totalCnt = either.length + multi.length;
  return totalCnt;
};
