//Require the db configuration
const dbConfiguration = require('./database.config.js'); 

//create Sequelize connection for db
const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfiguration.database, dbConfiguration.user, dbConfiguration.password, {
    host: dbConfiguration.host, 
    dialect: dbConfiguration.dialect, 
    operatorsAliases: false, 

    pool: {
        max: dbConfiguration.pool.max, 
        min: dbConfiguration.pool.min
    }
}); 

module.exports = sequelize;