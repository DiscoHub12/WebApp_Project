const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define( "booking" , {
        id : {
            type : DataTypes.INTEGER(4),
            autoIncrement : true,
            primaryKey : true,
            allowNull: false
        },
        idUtente : {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },
        dataPrenotazione : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        completata : {
            type : DataTypes.INTEGER(1),
            allowNull : false
        }
    });

    return Booking;
}