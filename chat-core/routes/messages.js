const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, messagesController.list);
router.post('/', authenticateToken, messagesController.create);

module.exports = router;