module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define(
        "City",
        { cityName: DataTypes.STRING },
        { timestamps: false }
      );
      
      const Country = sequelize.define(
        "Country",
        { countryName: DataTypes.STRING },
        { timestamps: false }
      );
    const clients = sequelize.define('clients_master', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clientGroupId: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            // unique: true,
        },
    },
    
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false
    }
);

// Clients.hasOne(ClientsTemplatesMap, {
//     foreignKey: "client_id",
//     as: "templates_map",
// });

return City, Country, clients
}