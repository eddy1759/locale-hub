const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../config/config');

const generateAPIKEY = () => {
	const apiKey = uuidv4();
	return apiKey;
};

const generateJwtToken = (userid) => {
	return jwt.sign({ userid }, CONFIG.SECRET, { expiresIn: CONFIG.expiresIn });
};

const verifyJWT = (token) => {
	return jwt.verify(token, CONFIG.SECRET);
};

module.exports = {
	generateAPIKEY,
	generateJwtToken,
	verifyJWT,
};
