const db = require("../config/database.js");
const Gifts = require("../models/gifts.js");

//Todo aggiungere tutti i metodi per le Gifts.

exports.create = (req, res) => {
    res.status(201).send({
        message: "Hello"
    });
}