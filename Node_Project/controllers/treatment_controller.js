const db = require("../config/database.js");
const Treatment = require("../models/treatment.js");


//Create and Save a new Treatment
exports.create = (req, res) => {
    //Validate request
    if (!req.body.idUtente) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Treatment
    const treatment = {
        idUtente: req.body.idUtente,
        nome: req.body.nome,
        descrizione: req.body.descrizione,
        data: req.body.data
    };


    //Save Treatment in the database
    Treatment.create(treatment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Treatment."
            });
        });
};


exports.findAll = (req, res) => {
    Treatment.findAll({ where: {} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Treatments."
            });
        });
};


exports.find = (req, res) => {
    const id = req.params.id;

    Treatment.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Treatment with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Booking with id=" + id
        });

    });
};



