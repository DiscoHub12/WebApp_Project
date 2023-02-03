const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const Employee = require("../models/employee");
const passManager = require("../utils/passController");
const auth = require("../auth/jwtController");

//Secret for Authentication:
const secret = "!Rj(98bC%9sVn&^c";

// ---- AUTHENTICATION METHODS -----


exports.create = async (req, res) => {
    const nome = req.body.nameEmployee;
    const codice = req.body.code;
    const password = req.body.passwordEmployee + secret;
    const restrizioni = req.body.restrizioni;
    console.log("Employee : " + nome + " Codice : " + codice + " Password : " + password);

    //Valid the request : 
    if (!nome || !codice || !password || !restrizioni) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
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
            message: `Employee created with ${restrizioni} restrictions`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new Tutorial."
        });
    });
}


exports.login = async (req, res) => {
    let codice = req.body.codice;
    let password = req.body.password;

    //Valid the request : 
    if (!codice || codice == "" || !password || password == "") {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    password = password + secret;


    Employee.findOne({
        where: {
            codice,
        },
    }).then((employee) => {
        if (!employee) {
            return res.status(401).send({
                message: "Employee with this id not find.",
            });
        }

        return passManager.comparePass(password, employee.password)
            .then((isMatch) => {
                if (!isMatch) {
                    return res.status(401).send({
                        message: "Password not correct",
                    });
                } else {
                    const accessToken = auth.getAccessTokenEmployee(employee);
                    const refreshToken = auth.getRegfreshTokenEmployee(employee);
                    auth.refreshTokens.push(refreshToken);
                    const jsonResponse = { nome: employee.nome, codice: employee.codice, restrizioni: employee.restrizioni, accessToken: accessToken, refreshToken: refreshToken }
                    res.status(201).send({
                        jsonResponse,
                        message: "Login Successfull",
                    });
                }
            });
    });
    console.log("Login Successfull");
    console.log(auth.refreshTokens)

};


exports.logout = async (req, res) => {
    let refreshToken = req.body.refreshToken;

    //Validate the refresh token
    if (!refreshToken) {
        res.status(400).send({
            message: "Token not present.",
        });
    }

    let index = auth.refreshTokens.indexOf(refreshToken);

    if (index == -1) {
        return res.status(401).send({
            message: "You are not authenticated",
        });
    }

    auth.refreshTokens.splice(index, 1);
    console.log(auth.refreshTokens);

    res.status(200).send({
        message: "Logout Successfull",
    })
}


exports.refreshToken = async (req, res) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken || !auth.refreshTokens.includes(refreshToken)) {
        return res.status(401).send({
            message: "You are not authenticated",
        });
    }

    //
    let employee = auth.getEmployeeByRefreshToken(refreshToken);

    auth.refreshTokens = auth.refreshTokens.filter((token) => token != refreshToken);

    let newAccessToken = auth.getAccessTokenEmployee(employee);
    let newRefreshToken = auth.getRegfreshTokenEmployee(employee);
    auth.refreshTokens.push(newRefreshToken);
    console.log(auth.refreshTokens)

    return res.status(200).send({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    });
}


// --- OTHER METHODS ------


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


exports.update = async (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.newPassword + secret;

    if (!id || !newPassword) {
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


//------ESEMPI DI CODICE COMMENTATI-------

/**
 * ALTRO ESEMPIO DI LOGIN 1)
 * CODICE
  let employee = await Employee.findOne( {
        where: {
            [db.Sequelize.Op.or] : [
                { codice : codice}
            ]
        }
    });

    if(employee && passManager.comparePass(password, employee.password)){
        let accessToken = auth.getAccessTokenEmployee(employee);
        let refreshToken = auth.getRegfreshTokenEmployee(employee);
        auth.refreshTokens.push(refreshToken);
        const json = {nome : employee.nome, codice : employee.codice, restrizioni: employee.restrizioni, accessToken : accessToken, refreshToken: refreshToken};
        res.status(201).send({
            json,
            message: "Employee created"
        });
    } else {
        res.status(401).send({
            message : "Password not correct"
        });
    }
*/


/**
 * PER INVIARE UNA RISPOSTA CON JSON ALL'INTERNO
 * CODICE :
    const json = {nome : data.nome, codice : data.codice};
        res.status(201).send({
            //json,
            message: "Employee created"
        });
 */

/**
 * PER PRENDERE UN TOKEN DALL'HEADER
 * CODICE :
    const token = req.header("Authorization");
    res.status(201).send({
        token,
        message: "Employee created"
    });
 */
