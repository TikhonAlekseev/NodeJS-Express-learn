import { Router } from "express";
import RoomController from '../controllers/RoomController';

const router = Router();

router.get('/', RoomController.getRooms)
router.post('/add', RoomController.createRoom)
router.delete('/remove/:id', RoomController.deleteRoom)

export default router;
