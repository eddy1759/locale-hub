const APIKeyModel = require('../model/ApiKey');
const { errorLogger } = require('./logger');
const { verifyJWT } = require('../utils/helper');

async function authenticateApiKey(req, res, next) {
	try {
		// Check if API key is provided in the request query parameters or as bearer token in the header
		// const apiKey = req.query.apiKey;
		const apiKey = req.headers('Authorization').split(' ')[1];
		if (!apiKey) {
			return res.status(401).json({ message: 'API key is required' });
		}

		// Check if the API key exists and belongs to the authenticated user
		const apiKeyDoc = await APIKeyModel.findOne({
			apiKey,
		});
		if (!apiKeyDoc) {
			return res.status(401).json({ message: 'Invalid API key' });
		}

		// Attach the API key to the request object
		req.apiKey = apiKey;
		next();
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
}

const authenticateUser = async (req, res, next) => {
	try {
		// Verify and decode the JWT token
		const token = req.session.token;
		if (!token) {
			return res
				.status(401)
				.json({ message: 'Authorization token is missing' });
		}
		// const decodedToken = jwt.verify(token, CONFIG.SECRET);
		const decodedToken = verifyJWT(token);

		// Attach the user ID and API key to the request object
		req.userId = decodedToken.userId;
		next();
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

module.exports = { authenticateApiKey, authenticateUser };
