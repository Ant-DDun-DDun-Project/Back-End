module.exports = {
  createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
  },
};
