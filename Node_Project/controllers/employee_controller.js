const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const Employee = require("../models/employee");
const { getTableName } = require("../models/employee");

//Secret for Employee:
const secret = "!Rj(98bC%9sVn&^c";

//CREATE EMPLOYEE ACCOUNT
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

//DELETE THE EMPLOYEE ACCOUNT
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
exports.update = async (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.newPassword + secret;

    if (!id || !newPassword){
        res.status(400).send({
            message: "Fill all fields!"
        });
        return;
    }

    const employee = await Employee.findByPk(id);
    const saltEmployee = employee.salt; 
    const hashPassword = await bcrypt.hash(newPassword, saltEmployee);
    employee.set({
        password: `${hashPassword}`
    });
    employee.save();
    console.log("Password employee changed : " + hashPassword);
    res.status(201).send({
        message: "Password correctly modified."
    });
}

//FIND EMPLOYEE INTO THE DB AND SEND DATA
exports.find = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    Employee.findByPk(id).then(data => {
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


//FIND ALL EMPLOYEES INTO THE DB AND FIND DATA
exports.findAll = (req, res) => {
    Employee.findAll().then(data => {
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
