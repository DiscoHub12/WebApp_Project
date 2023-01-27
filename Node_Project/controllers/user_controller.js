const db = require("../config/database.js");
const User = require("../models/user");
const bcrypt = require('bcrypt');

const secret = "!Rj(98bC%9sVn&^c";

//CREATE USER ACCOUNT
exports.create = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password + secret;

    //Valid the request : 
    if (!email || !password) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("User : " + email + "Salt : " + salt + "Password : " + hashedPassword);

    const user = {
        nome : req.body.nome,
        cognome : req.body.cognome,
        email: email,
        salt: salt,
        password: hashedPassword
    };

    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the new User."
        });
    });
}


//DELETE THE USER ACCOUNT
exports.delete = (req, res) =>{
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    User.destroy({
        where : {id : id}
    }).then( num => {
        if(num == 1) {
            res.send({
                message : "User was deleted successfully"
            });
        } else {
            res.send ({
                message : `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    }). catch (err => {
        res.status(500).send({
            message : " Could not delete User with id : " + id
        });
    });
};


exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ 
            message: `${nums} User were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };


//METHOD THAT UPDATE EMPLOYEE
exports.update = async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password + secret;

    if (!id) {
      res.status(400).send({
          message: "Id can't be empty!"
      });
      return;
  }

    const user = await User.findByPk(id);
    const saltUser = user.salt; 
    const hashPassword = await bcrypt.hash(password, saltUser);

      if(email){
        user.set({
          email :  `${email}`
        });
        await user.save();
        res.status(201).send({
          message: "Email changed."
      });
      }
      if(password){
        user.set({
          password :  `${hashPassword}`
        });
        await user.save();
        res.status(201).send({
          message: "Password changed."
      });
      }
    }


exports.findAll = (req, res) => {
    User.findAll({where : {}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

  exports.find = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Id can't be empty!"
        });
        return;
    }

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};