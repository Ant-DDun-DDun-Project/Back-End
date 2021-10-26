const Sequelize = require('sequelize');

const User = require('../models/users');
const Either = require('../models/either');
const Multi = require('../models/multi');
const Like = require('../models/likes');
const Vote = require('../models/votes');
const Comment = require('../models/comments');
const ChildComment = require('./child-comments');
const CommentLike = require('./comment-likes');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.Either = Either;
db.Multi = Multi;
db.Like = Like;
db.Vote = Vote;
db.Comment = Comment;
db.ChildComment = ChildComment;
db.CommentLike = CommentLike;

User.init(sequelize);
Either.init(sequelize);
Multi.init(sequelize);
Like.init(sequelize);
Vote.init(sequelize);
Comment.init(sequelize);
ChildComment.init(sequelize);
CommentLike.init(sequelize);

User.associate(db);
Either.associate(db);
Multi.associate(db);
Like.associate(db);
Vote.associate(db);
Comment.associate(db);
ChildComment.associate(db);
CommentLike.associate(db);

module.exports = db;
