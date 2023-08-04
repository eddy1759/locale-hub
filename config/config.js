const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const CONFIG = {
	PORT: process.env.PORT,
	rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
	rateLimitMax: process.env.RATE_LIMIT_MAX,
	url: process.env.DB,
	REDIS_URL: process.env.REDIS_URL,
	SECRET: process.env.JWT_SECRET,
	expiresIn: process.env.EXPIRE_IN,
	tty: process.env.CACHE_EXPIRATION_SECONDS,
	GOOGLE_PASS: process.env.GOOGLE_PASS,
};

module.exports = CONFIG;
