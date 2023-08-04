const { Sequelize } = require('sequelize');
const CONFIG = require('./config');
const { errorLogger, infoLogger } = require('../middleware/logger');

const sequelize = new Sequelize( CONFIG.url, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false
		},
	},
});

module.exports = dbConnection;
