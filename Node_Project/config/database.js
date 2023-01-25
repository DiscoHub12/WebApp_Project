//Require the db configuration
const dbConfig = require('./database.config.js'); 

//create Sequelize connection for db
const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host, 
    dialect: dbConfig.dialect, 
    operatorsAliases: false, 

    pool: {
        max: dbConfig.pool.max, 
        min: dbConfig.pool.min
    }
}); 

const db = {}

//sequelize into the db 
db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

//Require the models class

db.card = require('../models/card.js')(sequelize, Sequelize); 
db.booking = require ('../models/booking.js')(sequelize, Sequelize);
db.product = require ('../models/product.js')(sequelize, Sequelize);
db.user = require ('../models/user.js')(sequelize, Sequelize);

//Export the db
module.exports = db; 