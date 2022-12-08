const { Router } = require("express");
const RoomController = require('../controllers/RoomController');
const router = new Router;

router.get('/', RoomController.getRooms)

router.post('/add',RoomController.createRoom)

router.delete('/remove/:id',RoomController.deleteRoom)

module.exports = router;
