const { Either, Multi } = require('../../models');

exports.countPosting = async () => {
  // 기존 방식
  // const eitherNum = await Either.count({});
  // const multiNum = await Multi.count({});

  const either = await Either.findAll();
  const multi = await Multi.findAll();
  const eitherNum = either.length;
  const multiNum = multi.length;
  const postingNum = eitherNum + multiNum;
  return postingNum;
};
