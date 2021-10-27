const { Either, Multi } = require('../../models');

exports.countPosting = async () => {
  const eitherNum = await Either.count({});
  const multiNum = await Multi.count({});
  const postingNum = eitherNum + multiNum;
  return postingNum;
};
