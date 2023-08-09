module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'apiKey',
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			apiKey: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true,
				unique: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			createdBy: {
				type: DataTypes.UUID,
				allowNull: false,
				required: true,
				unique: true,
			},
		},
		{
			tableName: 'apiKeys',
		}
	);
};
