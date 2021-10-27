const { Vote } = require('../../models');
const sequelize = require('sequelize');

exports.countAttend = async () => {
  const votes = await Vote.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('user')), 'vote']],
  });
  return votes.length;
};
