import { Router } from "express";
import MessageController from '../controllers/MessageController';

const router = Router();

router.get('/:id', MessageController.getMessages)
router.post('/create', MessageController.createMessage)
router.delete('/:id', MessageController.deleteMessage)

export default router;