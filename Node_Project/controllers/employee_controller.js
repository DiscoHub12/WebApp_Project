const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const Employee = require("../models/employee");

//Secret for Employee:
const secret = "!Rj(98bC%9sVn&^c";

//CREATE EMPLOYEE 
exports.create = async (req, res) => {
    const codice = req.body.codice;
    const password = req.body.password + secret;

    //Valid the request : 
    if (!codice || !password) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Employee : " + codice + "Salt : " + salt + "Password : " + hashedPassword);

    const employee = {
        codice: codice,
        salt: salt,
        password: hashedPassword
    };

    Employee.create(employee).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new Tutorial."
        });
    });
}

//METHOD THAT DELETE
exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    Employee.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Employee was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Emoloyee with id=" + id
            });
        });
}


//METHOD THAT UPDATE EMPLOYEE
exports.update = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    const OldPassowrd = req.body.oldPassword;
    const newPassword = req.body.newPassword + secret;
    const employee = Employee.findByPk(id);
    res.status(500).send({
        message: "Method not finish."
    })



}

exports.find = (req, res) => {
    //Todo implementare
    res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
    });


}

exports.findAll = (req, res) => {
    //Todo implementare
    res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
    });
}
