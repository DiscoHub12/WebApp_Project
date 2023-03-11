const { json } = require("body-parser");
const { Sequelize, where } = require("sequelize")
const db = require("../config/database.js");
const Card = require("../models/card");
const User = require("../models/user");


exports.create = (req, res) => {
    const nome = req.body.nome;
    const cognome = req.body.cognome;
    const codice = req.body.codice;

    if (!nome || !cognome) {
        res.status(400).send({
            status: 400,
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
                if (result != null) {
                    res.status(402).send({
                        status: 402,
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
                            status: 500,
                            message: err.message || "Some error occurred while creating the Card."
                        })
                    })
                }
            })
        } else {
            res.status(404).send({
                status: 404,
                message: "User not found!"
            });
        }
    });
}


exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            status: 400,
            message: "Id can't be empty!"
        });
    }

    Card.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                status: 200,
                message: "Card was deleted successfully!"
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: `Could not delete Card with id=${id}`,
            });
        });
}


exports.find = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            status: 400,
            message: "Id can't be empty!"
        });
        return;
    }

    Card.findByPk(id).then(data => {
        if (data) {
            res.status(200).send({
                status: 200,
                data: data,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot find Card with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: `Error retrieving Card with id=${id}`,
        });
    });
}


exports.findCardUser = async (req, res) => {
    const idUtente = req.params.id;

    if (!idUtente) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        })
    }

    Card.findOne({ where: { idUtente: idUtente } }).then(
        data => {
            if (data) {
                res.status(200).send({
                    status: 200,
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
                status: 500,
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
}


exports.findAll = (req, res) => {
    Card.findAll({
        include: [{
            model: User,
            as: 'owner',
            attributes: ['id', 'nome', 'cognome'],
        }]
    }).then(data => {
        if (data) {
            res.status(200).send({
                status: 200,
                data,
                message: "All Cards were retrieved successfully!",
            })
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot find Cards. Probably error with connection.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });
}


exports.addPoints = async (req, res) => {
    const codice = req.body.codice;
    const punti = parseInt(req.body.punti);

    if (!codice || !punti) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
    }

    const card = await Card.findOne({ where: { codice: codice } });

    if (card) {
        const puntiAttuali = parseInt(card.punti); 
        const updated = puntiAttuali + punti; 
        console.log(updated);
        card.set({ punti: updated });
        await card.save();

        res.status(200).send({
            status: 200,
            message: "Points added."
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Some error occurred while retrieving card."
        });
    }
}


exports.addPointsAll = async (req, res) => {
    const punti = req.body.punti;

    if (!punti) {
        res.status(400).send({
            status: 400,
            message: "Number of points can't be null!"
        });
    }

    await Card.update({ punti: Sequelize.literal(`punti + ${punti}`) }, { where: {} });

    res.status(200).send({
        status: 200,
        message: "Points add in all Cards.",
    });
}


exports.removePoints = async (req, res) => {
    const codice = req.body.codice;
    const punti = parseInt(req.body.punti);

    if (!codice || !punti) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
    }

    const card = await Card.findOne({ where: { codice: codice } });

    if (card) {
        const puntiAttuali = parseInt(card.punti); 
        const updated = puntiAttuali - punti; 
        console.log(updated);
        card.set({ punti: updated });
        await card.save();

        res.status(200).send({
            status: 200,
            message: "Points removed."
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Some error occurred while retrieving card."
        });
    }
}


exports.removePointsAll = async (req, res) => {
    const punti = req.body.punti;

    if (!punti) {
        res.status(400).send({
            status: 400,
            message: "Number of points can't be null!"
        });
        return;
    }

    await Card.update({ punti: Sequelize.literal(`punti - ${punti}`) }, { where: {} });

    res.status(200).send({
        status: 200,
        message: "Points removed in all Cards.",
    });
}
