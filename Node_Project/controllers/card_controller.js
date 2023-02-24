const { json } = require("body-parser");
const { Sequelize, where } = require("sequelize")
const db = require("../config/database.js");
const Card = require("../models/card");
const User = require("../models/user");


//CREATE CARD METHOD
exports.create = (req, res) => {
    const nome = req.body.nome;
    const cognome = req.body.cognome;
    const codice = req.body.codice;

    if (!nome || !cognome) {
        res.status(400).send({
            status: 404,
            message: "Content can't be empty!"
        });
        return;
    }

    User.findOne({
        where: { nome: nome, cognome: cognome }
    }).then(user => {
        if (user) {
            Card.findOne({
                where: { idUtente: user.id },
            }).then(result => {
                if (result) {
                    res.status(400).send({
                        status: 400,
                        message: "Card already exists!"
                    })
                } else {
                    const card = {
                        idUtente: user.id,
                        codice: codice,
                    }
                    Card.create(card).then(data => {
                        res.status(201).send({
                            status: 201,
                            message: "Card created successfully!",
                        });
                    }).catch(err => {
                        res.status(500).send({
                            status : 500,
                            message: err.message || "Some error occurred while creating the Card."
                        })
                    })
                }
            })
        } else {
            res.status(405).send({
                status: 405,
                message: "User not found!"
            });
        }
    });
}

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
                message: `Cannot find Card with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Card with id=" + id
        });
    });

}

exports.findCardUser = async (req, res) => {
    const idUtente = req.params.id;

    Card.findOne({ where: { id: idUtente } }).then(
        data => {
            if (data) {
                res.status(201).send({
                    status: 201,
                    data,
                    message: "Card was retrieved successfully!",
                })
            } else {
                res.status(404).send({
                    status: 404, 
                    message: `You don't have Card.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });


}

//FIND ALL CARDS
exports.findAll = (req, res) => {
    Card.findAll({
        include: [{
            model: User,
            as: 'owner',
            attributes: ['id', 'nome', 'cognome'],
        }]
    }).then(data => {
        if (data) {
            res.status(201).send({
                status: 201,
                data,
                message: "All Cards were retrieved successfully!",
            })
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
    const codice = req.body.codice;
    const punti = req.body.punti;

    if(!codice || !punti){
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    const card = await Card.findOne({ where: { codice: codice } });

    if (card) {
        card.punti += punti
        await card.save();

        res.status(201).send({
            status: 201, 
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

    if (!punti) {
        res.status(400).send({
            message: "Number of points can't be null!"
        });
        return;
    }

    await Card.update({
        punti: Sequelize.literal(`punti + ${punti}`)
    }, {
        where: {}
    });

    res.status(201).send({
        status: 201,
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

    if (!punti) {
        res.status(400).send({
            message: "Number of points can't be null!"
        });
        return;
    }

    await Card.update({
        punti: Sequelize.literal(`punti - ${punti}`)
    }, {
        where: {}
    });

    res.status(201).send({
        message: "Points removed in all Cards.",
    })
}
