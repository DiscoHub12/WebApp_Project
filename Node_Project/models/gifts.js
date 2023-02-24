const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.js'); 

class Gifts extends Model {}

Gifts.init({
    
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    nome : {
        type: DataTypes.CHAR(200),
        allowNull: false,
    }, 
    punti : {
        type: DataTypes.INTEGER(5),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Gifts',
});


module.exports = Gifts;