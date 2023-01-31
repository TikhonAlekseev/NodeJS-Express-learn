const { Router } = require("express");
const MessageController = require('../controllers/MessageController');

const router = new Router;

router.get('/:id', MessageController.getMessages)
router.post('/create', MessageController.createMessage)
router.delete('/:id', MessageController.deleteMessage)

module.exports = router;