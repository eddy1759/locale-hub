const winston = require('winston');

const infoLogger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level}: ${message}`;
		})
	),
	transports: [new winston.transports.Console()],
});

const errorLogger = winston.createLogger({
	level: 'error',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level}: ${message}`;
		})
	),
	transports: [new winston.transports.Console()],
});

module.exports = { infoLogger, errorLogger };
