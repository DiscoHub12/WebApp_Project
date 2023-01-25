const { DataTypes } = require("sequelize"); 

module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
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
        },
    });

    return Card;
}