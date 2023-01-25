const db = require("../config/database.js");
const Card = db.card; 
const Op = db.Sequelize.Op; 

//Create and Save a new Card : 
exports.create = (req, res) => {
    //Valid the request : 
    if(!req.body.codice){
        res.status(400).send({
            message: "Content can't be empty!"
        }); 
        return; 
    }

    //Create a new Card : 
    const card = {
        idUtente : req.body.idUtente, 
        codice : req.body.codice
    }

    Card.create(card)
    .then(data => {
        res.send(data); 
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new Tutorial."
        }); 
    });
};
