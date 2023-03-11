const db = require("../config/database.js");
const Treatment = require("../models/treatment.js");
const User = require("../models/user");


exports.create = (req, res) => {
    const nome = req.body.nome;
    const cognome = req.body.cognome;
    const nomeTrattamento = req.body.nomeTrattamento;
    const descrizione = req.body.descrizione;
    const data = req.body.data;


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
            const treatment = {
                nome: nome,
                cognome: cognome,
                nomeTrattamento: nomeTrattamento,
                descrizione: descrizione,
                data: data
            }
            Treatment.create(treatment).then(data => {
                res.status(201).send({
                    status: 201,
                    message: "Treatment created successfully."
                });
            }).catch(err => {
                res.status(500).send({
                    status: 500,
                    message: err.message || "Some error occurred while creating the new Treatment."
                })
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: `Cannot find User.`
            });
        }
    });
}


exports.findAll = (req, res) => {
    Treatment.findAll({
        where: {}
    }).then(data => {
        if (data) {
            res.status(200).send({
                status: 200,
                data: data,
                message: "Treatment list retrieved successfully."
            })
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot find Treatments. Probably error with connection.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while retrieving Treatments."
        });
    });
};

exports.findOne = (req, res) => {
    const nome = req.query.nome;
    const cognome = req.query.cognome;

    if (!nome || !cognome) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
    }
    Treatment.findAll({ where: { nome: nome, cognome: cognome } })
        .then(data => {
            if (data) {
                res.status(200).send({
                    status: 200,
                    data: data,
                    message: "Treatment list retrieved successfully."
                })
            } else {
                res.status(404).send({
                    status: 404,
                    message: `Cannot find Treatment with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: err.message || "Some error occurred while retrieving Treatments."
            });
        });

}


exports.find = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
        return;
    }

    Treatment.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send({
                    status: 200,
                    data: data,
                    message: "Treatment list retrieved successfully."
                })
            } else {
                res.status(404).send({
                    status: 404,
                    message: `Cannot find Treatment with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                status: 500,
                message: "Error retrieving Treatment with idUser=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!",
        })
    }

    Treatment.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                status: 200,
                message: "Treatment was deleted successfully"
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot delete Treatment with id=${id}. Maybe Treatment was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: " Could not delete Treatment with id : " + id
        });
    });
};



