const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmailNotification = require('../utils/sendMail');
const CONFIG = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				require: true,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				require: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				require: true,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 6,
					isAlphanumeric: true,
				},
			},
			Otp: {
				type: DataTypes.INTEGER,
				validate: {
					len: [6],
				},
			},
			OtpExpiration: {
				type: DataTypes.DATE,
			},
			isVerified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			tableName: 'users',
		}
	);

	// Sequelize hooks to hash the password before saving
	User.beforeCreate(async (user) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	// Method to compare provided password with the hashed password
	User.prototype.comparePassword = async function (password) {
		return bcrypt.compare(password, this.password);
	};

	// Method to generateOTP for user
	User.prototype.generateOTP = function () {
		return crypto.randomInt(100000, 1000000).toString();
	};

	// Method to send otp to user email
	User.prototype.sendOTPToEmail = async function () {
		const otp = this.generateOTP();
		const otpExpiration = new Date(Date.now() + CONFIG.OTP_EXPIRATION_DURATION);

		this.Otp = otp;
		this.OtpExpiration = otpExpiration;

		await sendEmailNotification(
			this.email,
			'OTP Verification',
			`Your OTP for email verification is: ${otp}. It will expire in 5 minutes`
		);
	};

	User.prototype.verifyOTP = function (enteredOTP) {
		if (this.OtpExpiration < new Date()) {
			return false;
		}

		return this.Otp === enteredOTP;
	};

	return User;
};
