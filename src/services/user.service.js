const { User, apiKey } = require('../model/index');
const { generateAPIKEY, generateJwtToken } = require('../utils/helper');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
	try {
		if (userBody.password !== userBody.confirmPassword) {
			return Error('Password do not match');
		}
		const existingUser = await User.findOne({
			where: { email: userBody.email },
		});
		if (existingUser) {
			return Error('User with email already exist');
		}
		const user = User.create(userBody);
		return user;
	} catch (error) {
		return error;
	}
};

/**
 * Verification of otp
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const verifyOtp = async (userBody) => {
	try {
		const user = await User.findOne({
			where: { Otp: userBody.otp },
		});
		if (!user || !user.verifyOTP(userBody.otp)) {
			return Error('Invalid OTP or OTP has expired.');
		}
		user.isVerified = true;
		await user.save();
		return user;
	} catch (error) {
		return error;
	}
};

/**
 * User Login
 * @param {Objet} userBody
 * @returns {Promise<{apiKey: string, token: string}>}
 */
const loginUser = async (userBody) => {
	try {
		const user = await User.findOne({
			where: { email: userBody.email },
		});

		if (!user || !(await user.comparePassword(userBody.password))) {
			throw new Error('Invalid email or password');
		}

		if (!user.isVerified) {
			throw new Error('Account is not verified');
		}

		const userApiKey = await apiKey.findOne({
			where: { createdBy: user.id },
		});

		if (userApiKey) {
			// return { apiKey: userApiKey.apiKey, token: null }; // Token should be generated only once during login;
			throw new Error('User is already logged in');
		}
		const apikey = generateAPIKEY();
		const newApiKey = await apiKey.create({
			apiKey: apikey,
			createdBy: user.id,
		});

		const token = generateJwtToken(user.id);
		return { apiKey: newApiKey.apiKey, token: token };
	} catch (error) {
		return error;
	}
};

module.exports = {
	createUser,
	verifyOtp,
	loginUser,
};
