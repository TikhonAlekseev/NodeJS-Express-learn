const { Router } = require("express");
const router = new Router;
const AuthController = require('../controllers/AuthController');

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/refresh', AuthController.updateTokens)
router.get('/getUsers', AuthController.getUsers)

module.exports = router;