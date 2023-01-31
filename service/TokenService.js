const jwt = require('jsonwebtoken');
const Token = require("../models/token");
const JWT_ACCESS_SECRET_KEY = "JWT_ACCESS_SECRET_KEY";
const JWT_REFRESH_SECRET_KEY = "JWT_REFRESH_SECRET_KEY";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(payload) {
    try {
      const userData = jwt.verify(payload, JWT_ACCESS_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(payload) {
    try {
      const userData = jwt.verify(payload, JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({ userId, refreshToken })
    return token
  }

  async deleteToken(refreshToken) {
    await Token.deleteOne({ refreshToken })
  }

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken })
  }
}

module.exports = new TokenService();