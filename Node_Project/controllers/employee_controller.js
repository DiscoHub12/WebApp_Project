const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const Employee = require("../models/employee");
const passManager = require("../utils/passController");
const auth = require("../auth/jwtController");
//Secret for Authentication:
const secret = "!Rj(98bC%9sVn&^c";


exports.create = async (req, res) => {

    if (req.body.nameEmployee == "" || req.body.nameEmployee == undefined || req.body.code == "" || req.body.code == undefined || req.body.passwordEmployee == "" || req.body.passwordEmployee == undefined) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
        return;
    }

    const nome = req.body.nameEmployee;
    const codice = req.body.code;
    const password = req.body.passwordEmployee + secret;
    const restrizioni = req.body.restrizioni;
    console.log("Employee : " + nome + " Codice : " + codice + " Password : " + password);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Salt : " + salt + " Hashed Password : " + hashedPassword);


    console.log("Employee : " + nome + " Codice : " + codice + " Salt : " + salt + " Password : " + hashedPassword);

    const employee = {
        nome: nome,
        codice: codice,
        salt: salt,
        password: hashedPassword,
        restrizioni: restrizioni
    };

    Employee.create(employee).then(data => {
        res.status(201).send({
            status: 201,
            message: `Employee created with ${restrizioni} restrictions`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new Tutorial."
        });
    });
}


exports.login = async (req, res) => {
    if (req.body.codice == "" || req.body.codice == undefined || req.body.password == "" || req.body.password == undefined) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    let codice = req.body.codice;
    let password = req.body.password;

    password = password + secret;


    Employee.findOne({
        where: {
            codice,
        },
    }).then((employee) => {
        if (!employee) {
            return res.status(404).send({
                status: 404,
                message: "Employee with this code not find.",
            });
        }

        return passManager.comparePass(password, employee.password)
            .then((isMatch) => {
                if (!isMatch) {
                    console.log("Password not valid");
                    return res.status(400).send({
                        status: 400,
                        message: "Password not correct",
                    });
                } else {
                    const accessToken = auth.getAccessTokenEmployee(employee);
                    const refreshToken = auth.getRegfreshTokenEmployee(employee);
                    auth.addRefreshToken(refreshToken);
                    const jsonResponse = { id: employee.id, nome: employee.nome, codice: employee.codice, restrizioni: employee.restrizioni }
                    res.status(200).send({
                        status: 200,
                        jsonResponse,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        message: "Login Successfull",
                    });
                }
            });
    });
};


exports.logout = async (req, res) => {
    let refreshToken = req.body.refreshToken;

    //Validate the refresh token
    if (!refreshToken) {
        res.status(400).send({
            status: 400,
            message: "Token not present.",
        });
    }

    let index = auth.refreshTokens.indexOf(refreshToken);

    if (index == -1) {
        return res.status(404).send({
            status: 404,
            message: "You are not authenticated",
        });
    }

    auth.refreshTokens.splice(index, 1);
    console.log(auth.refreshTokens);

    res.status(200).send({
        status: 200,
        message: "Logout Successfull",
    });
}


exports.refreshToken = async (req, res) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken || !auth.containsToken(refreshToken)) {
        return res.status(404).send({
            status: 404,
            message: "You are not authenticated",
        });
    }

    let employee = auth.getEmployeeByRefreshToken(refreshToken);

    auth.refreshTokens = auth.refreshTokens.filter((token) => token != refreshToken);

    let newAccessToken = auth.getAccessTokenEmployee(employee);
    let newRefreshToken = auth.getRegfreshTokenEmployee(employee);
    auth.refreshTokens.push(newRefreshToken);
    console.log(auth.refreshTokens)

    return res.status(200).send({
        status: 200,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    });
}


//-----OTHER METHODS-----

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
            res.status(200).send({
                status: 200,
                message: "Employee was deleted successfully!"
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: `Could not delete Employee with id=${id}.`
        });
    });
}


exports.update = async (req, res) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword + secret;
    const newPassword = req.body.newPassword + secret;

    if (!req.params.id || !req.body.newPassword) {
        res.status(400).send({
            status: 400,
            message: "Content can't be empty!"
        });
        return;
    }

    const employee = await Employee.findByPk(id);

    if (employee) {
        if (oldPassword != null && oldPassword != undefined) {
            const saltEmployee = employee.salt;
            const hashPassword = await bcrypt.hash(newPassword, saltEmployee);
            return passManager.comparePass(oldPassword, employee.password)
                .then((isMatch) => {
                    console.log("Old : " + oldPassword + "Real : " + employee.password);

                    if (!isMatch) {
                        return res.status(404).send({
                            status: 404,
                            message: "Password not correct",
                        });
                    } else {
                        employee.set({
                            password: `${hashPassword}`
                        });
                        employee.save();
                        res.status(200).send({
                            status: 200,
                            message: "Employee data update."
                        });
                    }
                }, err => {
                    res.status(500).send({
                        status: 500,
                        message: err.message || "Some error occurred while updating the Employee data."
                    });
                });
        }
    }
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

    Employee.findByPk(id).then(data => {
        if (data) {
            res.status(200).send({
                status: 200,
                data: data,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot find Employee with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: `Error retrieving Employee with id=${id}.`
        });
    });
}


exports.findAll = (req, res) => {
    Employee.findAll({
        attributes: ['id', 'nome', 'codice', 'restrizioni']
    }).then(data => {
        if (data) {
            res.status(200).send({
                status: 200,
                data: data,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Cannot find Employee. Probably error with connection.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });
}