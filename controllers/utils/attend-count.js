const { Vote } = require('../../models');
const sequelize = require('sequelize');

exports.countAttend = async () => {
  //투표에 참여한 회원을 뽑아옴(중복제거)
  const votes = await Vote.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('user')), 'vote']],
  });
  //투표에 참여한 회원 수
  return votes.length;
};
