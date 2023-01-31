const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');

class AuthController {
    async registration(request, response) {
        try {
            const { username, password, email } = request.body;
            const userData = await AuthService.registration({ username, password, email })
            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return response.json(userData)
        }
        catch (e) {
            response.status(500).json({ message: e.message })
        }
    }
    async login(request, response) {
        try {
            const { email, password } = request.body;
            const user = await AuthService.login({ email, password })
            response.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return response.json(user)
        }
        catch (e) {
            response.status(500).json({ message: "Ошибка записи в базу данных", error: e })
        }
    }
    async logout(request, response) {
        try {
            const { refreshToken } = request.cookies;
            await AuthService.logout(refreshToken)
            response.clearCookie('refreshToken')
            return response.json({ message: "Выход успешно совершен" })
        }
        catch (e) {
            response.status(500).json({ message: e })
        }
    }
    async updateTokens(request, response) {
        try {
            const { refreshToken } = request.cookies;
            const tokens = await AuthService.updateTokens(refreshToken)
            response.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return response.json(tokens)
        }
        catch (e) {
            response.status(500).json({ message: e })
        }
    }

    async getUsers(request, response) {
        try {
            const { authorization } = request.headers;
            const accessToken = authorization.split(" ")[1];
            const isTokenVerify = TokenService.validateAccessToken(accessToken);

            if (!isTokenVerify || !authorization || !accessToken) {
                throw new Error("Пользователь не авторизован!")
            }
            const users = await AuthService.getUsers()

            return response.json(users)
        }
        catch (e) {
            response.status(500).json({ message: e })
        }
    }


}

module.exports = new AuthController();