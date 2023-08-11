const express = require('express');
const { body } = require('express-validator');
const {
	registerUser,
	otpVerification,
	signIn,
} = require('../controller/user.controller');

const router = express.Router();

router.post(
	'/register',
	[
		body('firstName').isString().trim().notEmpty(),
		body('lastName').isString().trim().notEmpty(),
		body('email').isEmail().normalizeEmail(),
		body('password').isString().trim().isLength({ min: 6 }),
		body('confirmPassword').isString().trim().isLength({ min: 6 }),
	],
	registerUser
);

router.post(
	'/verify',
	[body('otp').isString().trim().notEmpty()],
	otpVerification
);

router.post(
	'/login',
	[
		body('email').isEmail().normalizeEmail(),
		body('password').isString().trim().isLength({ min: 6 }),
	],
	signIn
);

module.exports = router;
