const { Sequelize } = require('sequelize');
const CONFIG = require('./config');

const sequelize = new Sequelize(CONFIG.url, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

module.exports = sequelize;
