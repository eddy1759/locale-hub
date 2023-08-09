const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
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
					isAlphanumeric: true,
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
		},
		{
			tableName: 'users',
		}
	);

	// Sequelize hooks to hash the password before saving
	User.beforeCreate(async (user) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	// Method to compare provided password with the hashed password
	User.prototype.comparePassword = async function (password) {
		return bcrypt.compare(password, this.password);
	};

	return User;
};
