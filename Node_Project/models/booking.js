const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database')

class Booking extends Model { }

Booking.init({
    // Model attributes are defined here
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
    dataPrenotazione: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    completata: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Booking'
});

module.exports = Booking;


