const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Treatment extends Model { }

Treatment.init({

    id: {
        type: DataTypes.INTEGER(4),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.CHAR(80),
        allowNull: false,
    },
    cognome: {
        type: DataTypes.CHAR(80),
        allowNull: false,
    },
    nomeTrattamento: {
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



module.exports = Treatment;

