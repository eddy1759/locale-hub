const { validationResult } = require('express-validator');
const { errorLogger } = require('../utils/logger');
const userService = require('../services/user.service');

const registerUser = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				error: errors.array()[0].msg,
			});
		}
		const user = userService.createUser(req.body);
		if (user instanceof Error) {
			return res.status(400).json({ success: false, error: user.message });
		}
		await user.sendOTPToEmail();

		res.status(201).json({ message: 'User Registered Successfully' });
	} catch (error) {
		errorLogger.error(error.message);
		return res
			.status(500)
			.json({ status: false, error: 'Internal Server Error' });
	}
};

const otpVerification = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({
				success: false,
				error: errors.array()[0].msg,
			});
		}
		const user = userService.verifyOtp(req.body);
		if (user instanceof Error) {
			return res.status(400).json({ success: false, error: user.message });
		}
		return res
			.status(200)
			.json({ success: true, message: 'OTP verified successfully' });
	} catch (error) {
		errorLogger.error(error.message);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

const signIn = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({
				success: false,
				error: errors.array()[0].msg,
			});
		}
		const loginResult = await userService.loginUser(
			req.body.email,
			req.body.password
		);
		if (loginResult instanceof Error) {
			return res
				.status(401)
				.json({ success: false, error: 'Invalid email or password' });
		}

		// Destructuring the returned object
		const { apiKey, token } = loginResult;

		// Instead of setting the token and apiKey in req.session, return them in the response
		return res.status(200).json({
			success: true,
			message: 'User logged in successfully',
			token: token,
			apiKey: apiKey,
		});
	} catch (error) {
		errorLogger.error(error.message);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

module.exports = { registerUser, otpVerification, signIn };
