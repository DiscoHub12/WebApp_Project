const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database'); 

class Card extends Model {}

Card.init({
     //Model attributes are defined here: 
     id: {
        type: DataTypes.INTEGER(3),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idUtente: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
    },
    codice: {
        type: DataTypes.CHAR(10),
        allowNull: false,
    },
    punti: {
        type: DataTypes.INTEGER(4),
        allowNull: false, 
        defaultValue: 0
    }},{
    sequelize, 
    modelName: 'Card'
}); 

module.exports = Card; 