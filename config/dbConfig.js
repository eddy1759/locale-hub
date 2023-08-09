const { Sequelize } = require('sequelize');
const CONFIG = require('./config');
const { infoLogger, errorLogger } = require('../src/utils/logger');

const sequelize = new Sequelize(CONFIG.url, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

async function connectToDatabase() {
	try {
		await sequelize.authenticate();
		infoLogger.info('Connection has been established successfully.');
	} catch (error) {
		errorLogger.error('Unable to connect to the database:', error);
	}
}

async function syncTable() {
	try {
		await sequelize.sync({ force: false });
		infoLogger.info('Database & tables synced');
	} catch (error) {
		errorLogger.error('Unable to sync database & tables:', error);
	}
}

module.exports = { connectToDatabase, syncTable };
