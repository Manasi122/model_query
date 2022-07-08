const dbConfig = require('../config/db.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected to sequelize database..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Clients = require('./clientModel.js')(sequelize, DataTypes)
db.cities = require('./clientModel.js')(sequelize, DataTypes)
db.countries = require('./clientModel.js')(sequelize, DataTypes)


// db.sequelize.sync({ alter: true })
db.sequelize.sync({ force: false })
.then(() => {
    console.log('All models were synchronized successfully.')
})


module.exports = db

