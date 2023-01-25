const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database'); 

class Employee extends Model {}

Employee.init({
     //Model attributes are defined here: 
     id: {
        type: DataTypes.INTEGER(3),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }, 
    codice : {
        type: DataTypes.INTEGER(5), 
        allowNull: false,
    }, 
    salt: {
        type: DataTypes.CHAR(200), 
        allowNull: false, 
    }, 
    password: {
        type: DataTypes.CHAR(200), 
        allowNull: false, 
    }

}, {
    sequelize, 
    modelName: 'Employee'
});

module.exports = Employee;