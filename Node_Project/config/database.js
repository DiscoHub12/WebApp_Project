//Require the db configuration
const dbConfiguration = require('./database.config.js'); 

//create Sequelize connection for db
const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfiguration.database, dbConfiguration.user, dbConfiguration.password, {
    host: dbConfig.host, 
    dialect: dbConfig.dialect, 
    operatorsAliases: false, 

    pool: {
        max: dbConfig.pool.max, 
        min: dbConfig.pool.min
    }
}); 

module.exports = sequelize;