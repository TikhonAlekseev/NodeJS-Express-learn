const { Router } = require("express");
const AuthController = require('../controllers/AuthController');

const router = new Router;

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/refresh', AuthController.updateTokens)
router.get('/getUsers', AuthController.getUsers)

module.exports = router;