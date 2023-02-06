const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const passManager = require("../utils/passController.js");
const auth = require("../auth/jwtController");

//Secret for Authentication
const secret = "!Rj(98bC%9sVn&^c";

// ---- AUTHENTICATION METHODS -----


exports.create = async (req, res) => {

  if(req.body.email == "" || req.body.email == undefined || req.body.password == "" || req.body.password == undefined){
    res.status(400).send({
      message: "Content can't be empty!"
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password + secret;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("User : " + email + "Salt : " + salt + "Password : " + hashedPassword);

  const user = {
    nome: req.body.nome,
    cognome: req.body.cognome,
    email: email,
    salt: salt,
    password: hashedPassword
  };

  User.create(user).then(data => {
    res.status(201).send({
      status: 201, 
      message: "User created successfully!",
    }); 
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the new User."
    });
  });
}


exports.login = async (req, res) => {

  if(req.body.email == "" || req.body.email == undefined || req.body.password == "" || req.body.password == undefined){
    res.status(400).send({
      message: "Content can't be empty!"
    });
    return;
  }

  let email = req.body.email;
  let password = req.body.password;

  password = password + secret; 

  User.findOne({
    where: {
      email: email
    },
  }).then((user) => {
    if (!employee) {
      return res.status(401).send({
        message: "User with this email not found.",
      });
    }

    return passManager.comparePass(password, employee.password)
      .then((isMatch) => {
        if (!isMatch) {
          console.log("Password not valid");
          return res.status(401).send({
            message: "Password not correct.",
          });
        } else {
          const accessToken = auth.getAccessTokenUser(user);
          const refreshToken = auth.getRefreshTokenUser(user);
          auth.refreshTokens.push(refreshToken);
          const jsonResponse = { id : user.id, nome: user.nome, cognome: user.cognome};
          res.status(201).send({
            status: 201,
            jsonResponse,
            accessToken: accessToken, 
            refreshToken: refreshToken,
            message: "Login Successfull.",
          });
        }
      });
  });

  console.log("Login Successfull.");
  console.log(auth.refreshTokens);
}


exports.logout = async (req, res) => {
  let refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(400).send({
      message: "Content can't be empty!"
    });
    return;
  }

  let index = auth.refreshTokens.indexOf(refreshToken);

  if (index == -1) {
    res.status(401).send({
      message: "You are not authenticated.",
    });
  }

  auth.refreshTokens.splice(index, 1);
  console.log(auth.refreshTokens);

  res.status(200).send({
    message: "Logout Successfull.",
  });
}

exports.refreshToken = async (req, res) => {
  let refreshToken = req.body.refreshToken; 

  if(!refreshToken || auth.refreshTokens.includes(refreshToken)){
    return res.status(401).send({
      message: "You are not authenticated.",
    });
  }

  let user = auth.getUserByRefreshToken(refreshToken);

  auth.refreshTokens = auth.refreshTokens.filter(token => token!== refreshToken);

  let newAccessToken = auth.getAccessTokenUser(user);
  let newRefreshToken = auth.getRefreshTokenUser(user);
  auth.refreshTokens.push(newRefreshToken);
  console.log(auth.refreshTokens);

  return res.status(200).send({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  }); 
}


// ---- OTHER METHODS ----

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Id can't be empty!"
    });
    return;
  }

  User.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: " Could not delete User with id : " + id
    });
  });
};


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

  if (email) {
    user.set({
      email: `${email}`
    });
    await user.save();
    res.status(201).send({
      message: "Email changed."
    });
  }
  if (password) {
    user.set({
      password: `${hashPassword}`
    });
    await user.save();
    res.status(201).send({
      message: "Password changed."
    });
  }
}


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


exports.findAll = (req, res) => {
  User.findAll({ where: {} })
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

/**
 * METODO DELETE ALL
 * CODICE : 
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        message: `${nums} User were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
 */





