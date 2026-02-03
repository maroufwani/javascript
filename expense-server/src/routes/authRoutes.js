const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

const loginValidator = [
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
];

const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
];

const resetPasswordValidator = [
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
];

const verifyValidator = [
    body('token').notEmpty().withMessage('Token is required')
];



router.post('/login', loginValidator, authController.login);
router.post('/register', registerValidator, authController.register);
router.post('/is-user-logged-in', authController.isUserLoggedIn);
router.post('/logout', authController.logout);
router.get('/verify', verifyValidator, authMiddleware.protect, authController.verify);
router.post('/google-auth', authController.googleSso);
router.post('/reset-password', resetPasswordValidator, authController.resetPassword);

module.exports = router;