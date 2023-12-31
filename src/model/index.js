const { DataTypes } = require('sequelize');
const {
	sequelize,
	connectToDatabase,
	syncTable,
} = require('../../config/dbConfig');

const UserModel = require('./User')(sequelize, DataTypes);
const apiKeyModel = require('./ApiKey');
const localeModel = require('./Locale');

connectToDatabase();

const User = UserModel;
// const User = UserModel(sequelize, DataTypes);
const apiKey = apiKeyModel(sequelize, DataTypes);
const locale = localeModel(sequelize, DataTypes);

// apiKey - user association
User.hasOne(apiKey, {
	foreignKey: 'createdBy',
});

apiKey.belongsTo(User, {
	foreignKey: 'createdBy',
});

syncTable();

module.exports = {
	User,
	apiKey,
	locale,
};
