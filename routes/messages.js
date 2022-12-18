const { Router } = require("express");
const router = new Router;
const MessageController = require('../controllers/MessageController');

router.get('/:id', MessageController.getMessages)
router.post('/create', MessageController.createMessage)



// router.delete('/', MessageController.deleteMessage)


module.exports = router;