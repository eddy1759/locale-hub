const nodemailer = require('nodemailer');
const CONFIG = require('../../config/config');
const { infoLogger, errorLogger } = require('./logger');

async function sendEmailNotification(email, subject, body) {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: 'eddy1759@gmail.com',
				pass: CONFIG.GOOGLE_PASS,
			},
		});

		const mailOptions = {
			from: 'eddy1759@gmail.com',
			to: email,
			subject: subject,
			text: body,
		};

		await transporter.sendMail(mailOptions);
		infoLogger.info('Email sent successfully');
	} catch (error) {
		errorLogger.error('Error sending email: ', error);
	}
}


module.exports = sendEmailNotification;
