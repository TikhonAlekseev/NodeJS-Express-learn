import { Router } from "express"
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/refresh', AuthController.updateTokens)
router.get('/getUsers', AuthController.getUsers)

export default router;