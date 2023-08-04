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
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				validateMetatdata(value) {
					if (!value || typeof value !== 'object') {
						throw new Error('metadata must be an object');
					}

					const requiredFields = [
						'slogan',
						'landmass',
						'population',
						'dialect',
						'latitude',
						'longitude',
						'createdDate',
						'createdBy',
					];

					for (const field of requiredFields) {
						if (!value[field]) {
							throw new Error(`metadata.${field} is required`);
						}
					}
				},
			},
		},
	});
};
