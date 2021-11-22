const jwt = require('jsonwebtoken');
require('dotenv').config;

module.exports = {
  authForGuest: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const [Bearer, token] = authorization.split(' ');
      if (!token) {
        res.locals.user = 13;
        next();
      } else {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = id;
        next();
      }
    } catch (err) {
      next(err);
    }
  },
  auth: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const [Bearer, token] = authorization.split(' ');
      if (!token) {
        res.status(401).json({ success: false });
      } else {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = id;
        next();
      }
    } catch (err) {
      next(err);
    }
  },
};
