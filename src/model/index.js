// const { sequelize, DataTypes } = require('sequelize');
// const UserModel = require('./User');
// const apiKeyModel = require('./ApiKey');

// (async () => await sequelize.sync({ alter: true }))();

// const User = UserModel(sequelize, DataTypes);
// const apiKey = apiKeyModel(sequelize, DataTypes);

// apiKey - user association
// A user should be able to have one apiKey with the user id as a foregin key in the apiKeyModel as createBy