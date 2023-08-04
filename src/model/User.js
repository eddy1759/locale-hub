module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: 6,
			},
		},
		Otp: {
			type: DataTypes.INTEGER,
			validate: {
				len: [4],
			},
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	});
};
