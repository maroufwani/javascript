const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login',authController.login);
router.post('/register', authController.register);
router.get('/verify', authMiddleware.protect, authController.verify);
router.post('/logout', authController.logout);

module.exports = router;