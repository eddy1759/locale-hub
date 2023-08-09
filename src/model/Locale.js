module.exports = (sequelize, DataTypes) => {
	return sequelize.define('locale', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		region: {
			type: DataTypes.STRING,
			required: true,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			required: true,
			allowNull: false,
		},
		LGA: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			required: true,
			allowNull: false,
		},
		metadata: {
			slogan: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			landmass: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			population: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			dialect: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			lattitude: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			longittude: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			createdDate: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			createdBy: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
		},
	});
};
