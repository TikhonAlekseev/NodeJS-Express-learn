const User = require('../models/user')
const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');
const UserDto = require('../dto/user-dto');

class AuthService {
    async registration({ username, password, email }) {
        const candidate = await User.findOne({ email })

        if (candidate) {
            throw new Error("Пользователь с такой почтой уже зарегистрирован!")
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ username, password: hashPassword, email })
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, ...userDto }
    }
    async login({ email, password }) {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("Пользователь не зарегистрирован!")
        }

        const isVerifyPassword = await bcrypt.compare(password, user.password)

        if (!isVerifyPassword) {
            throw new Error("Введен неверный пароль или логин")
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, ...userDto }
    }

    async logout(refreshToken) {
        await TokenService.deleteToken(refreshToken)
    }

    async updateTokens(refreshToken) {
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokensIsFromDb = await TokenService.findToken(refreshToken);

        if (!refreshToken || !userData || !tokensIsFromDb) {
            throw new Error('Пользователь не авторизован')
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, ...userDto }
    }

    async getUsers() {
        return await User.find()
    }
}

module.exports = new AuthService();