const { sequelize, DataTypes } = require('sequelize');
const UserModel = require('./User');
const apiKeyModel = require('./ApiKey');
const localeModel = require('./Locale');

(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);
const apiKey = apiKeyModel(sequelize, DataTypes);
const locale = localeModel(sequelize, DataTypes);

// apiKey - user association
User.hasOne(apiKey, {
	foreignKey: 'createdBy',
});

apiKey.belongsTo(User, {
	foreignKey: 'createdBy',
});

module.exports = {
	User,
	apiKey,
	locale,
};
