const { Sequelize, where } = require("sequelize");
const db = require("../config/database.js");
const Card = require("../models/card");

//CREATE CARD METHOD
exports.create = (req, res) => {
    const idUtente = req.body.idUtente;
    const codice = req.body.codice;

    //Valid the request : 
    if (!idUtente || !codice) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    //Create a new Card : 
    const card = {
        idUtente: req.body.idUtente,
        codice: req.body.codice
    }

    Card.create(card).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new Tutorial."
        });
    });
};

//DELETE CARD METHOD 
exports.delete = (req, res) => {
    const id = req.params.id;

    //Validate the correct id params :
    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    Card.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Card was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Card with id=" + id
            });
        });
}

//FIND ONE CARD BY ID
exports.find = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    Card.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
    });

}

//FIND ALL CARDS
exports.findAll = (req, res) => {
    Card.findAll().then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Cards. Probably error with connection.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });
}

//ADD POINTS INTO CARD BY ID 
exports.addPoints = async (req, res) => {
    const id = req.params.id;
    const punti = req.body.punti;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    const card = await Card.findOne({ where: { id: id } });

    if (card) {
        card.punti += punti
        await card.save();

        res.status(201).send({
            message: "Points added."
        });
    } else {
        res.status(500).send({
            message: "Some error occurred while retrieving card."
        });
    }
}

//ADD POINTS INTO ALL CARD 
exports.addPointsAll = async (req, res) => {
    const punti = req.body.punti;

    if(!punti){
        res.status(400).send({
            message: "Number of points can't be null!"
        });
        return;
    }

    await Card.update({
        punti: Sequelize.literal(`punti + ${punti}`)
    },{
        where: {}
    });

    res.status(201).send({
        message: "Points add in all Cards.",
    })
}

//REMOVE POINTS INTO CARD BY ID 
exports.removePoints = async (req, res) => {
    const id = req.params.id;
    const punti = req.body.punti;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    const card = await Card.findOne({ where: { id: id } });

    if (card) {
        let puntiCard = card.punti;
        let puntiTotals = puntiCard - punti;
        card.punti = puntiTotals

        await card.save();
        res.status(201).send({
            message: "Points removed."
        })
    } else {
        res.status(500).send({
            message: "Some error occurred while retrieving tutorials."
        });
    }
}

//REMOVE POINTS INTO ALL CARDS
exports.removePointsAll = async (req, res) => {
    const punti = req.body.punti;

    if(!punti){
        res.status(400).send({
            message: "Number of points can't be null!"
        });
        return;
    }

    await Card.update({
        punti: Sequelize.literal(`punti - ${punti}`)
    },{
        where: {}
    });

    res.status(201).send({
        message: "Points removed in all Cards.",
    })
}
