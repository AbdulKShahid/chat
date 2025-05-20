const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, usersController.list);
router.post('/', authenticateToken, usersController.create);

module.exports = router;