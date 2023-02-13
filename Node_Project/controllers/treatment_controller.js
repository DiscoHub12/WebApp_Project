const db = require("../config/database.js");
const Treatment = require("../models/treatment.js");
const User = require("../models/user");


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
            if(data){
                res.status(201).send({
                    status : 201,
                    data : data,
                    message: "Treatment created successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Treatment."
            });
        });
};


exports.findAll = (req, res) => {
    Treatment.findAll({
        include: [
            {
                model : User,
                as : 'owner',
                attributes: ['id', 'nome', 'cognome']
            }
        ] 
    })
        .then(data => {
            if(data){
                res.status(201).send({
                    status : 201,
                    data : data,
                    message: "Treatment list retrieved successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Treatments."
            });
        });
};

exports.findOne = (req, res) => {
    const idUser = req.params.id;

    Treatment.findAll({ where: { idUtente: idUser } })
    .then(data => {
        if (data) {
            res.status(201).send({
                status: 201,
                data: data,
                message: "Treatment list retrieved successfully."
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Treatments."
        });
    });
    
}


exports.find = (req, res) => {
    const nome = req.params.nome;

    Treatment.findAll({ where: { nome: nome } })
    .then(data => {
            if(data){
                res.status(201).send({
                    status : 201,
                    data : data,
                    message: "Treatment list retrieved successfully."
                })
            }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Treatment with idUser=" + i
        });

    });
};



