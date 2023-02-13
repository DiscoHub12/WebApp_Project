const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Treatment extends Model { }

Treatment.init({

    id: {
        type: DataTypes.INTEGER(4),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idUtente: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
    },
    nome: {
        type: DataTypes.CHAR(80),
        allowNull: false,
    },

    descrizione: {
        type: DataTypes.CHAR(200),
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Treatment',
});

Treatment.belongsTo(User, { foreignKey: 'idUtente', as : 'owner'});


module.exports = Treatment;

