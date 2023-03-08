const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const passManager = require("../utils/passController.js");
const auth = require("../auth/jwtController");
//Secret for Authentication
const secret = "!Rj(98bC%9sVn&^c";


exports.create = async (req, res) => {

  if (req.body.email == "" || req.body.email == undefined || req.body.password == "" || req.body.password == undefined) {
    res.status(400).send({
      status: 400,
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
      status: 500,
      message: err.message || "Some error occurred while creating the new User."
    });
  });
}


exports.login = async (req, res) => {

  if (req.body.email == "" || req.body.email == undefined || req.body.password == "" || req.body.password == undefined) {
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
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User with this email not found.",
      });
    }

    return passManager.comparePass(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          console.log("Password not valid");
          return res.status(400).send({
            status: 400,
            message: "Password not correct.",
          });
        } else {
          const accessToken = auth.getAccessTokenUser(user);
          const refreshToken = auth.getRegfreshTokenUser(user);
          auth.refreshTokens.push(refreshToken);
          const jsonResponse = { id: user.id, nome: user.nome, cognome: user.cognome, email: user.email };
          res.status(200).send({
            status: 200,
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
      status: 400,
      message: "Content can't be empty!"
    });
    return;
  }

  let index = auth.refreshTokens.indexOf(refreshToken);

  if (index == -1) {
    res.status(404).send({
      status: 404,
      message: "You are not authenticated.",
    });
  }

  auth.refreshTokens.splice(index, 1);
  console.log(auth.refreshTokens);

  res.status(200).send({
    status: 200,
    message: "Logout Successfull.",
  });
}

exports.refreshToken = async (req, res) => {
  let refreshToken = req.body.refreshToken;

  if (!refreshToken || auth.refreshTokens.includes(refreshToken)) {
    return res.status(404).send({
      status: 404,
      message: "You are not authenticated.",
    });
  }

  let user = auth.getUserByRefreshToken(refreshToken);

  auth.refreshTokens = auth.refreshTokens.filter(token => token !== refreshToken);

  let newAccessToken = auth.getAccessTokenUser(user);
  let newRefreshToken = auth.getRefreshTokenUser(user);
  auth.refreshTokens.push(newRefreshToken);
  console.log(auth.refreshTokens);

  return res.status(200).send({
    status: 200,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}


// ---- OTHER METHODS ----

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      status: 400,
      message: "Id can't be empty!"
    });
    return;
  }

  User.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.status(200).send({
        status: 200,
        message: "User was deleted successfully"
      });
    } else {
      res.status(404).send({
        status: 404,
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      status: 500,
      message: `Could not delete User with id=${id}.`
    });
  });
};


exports.update = async (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const oldPassword = req.body.oldPassword + secret;
  const password = req.body.password + secret;

  if (!id) {
    res.status(400).send({
      status: 400,
      message: "Id can't be empty!"
    });
    return;
  }

  const user = await User.findByPk(id);

  if (user) {
    if (email != null || email != undefined) {
      user.set({
        email: `${email}`
      });
      await user.save();
      res.status(200).send({
        status: 200,
        message: "User data changed."
      });
    } else if (password != null || password != undefined) {
      const saltUser = user.salt;
      const hashPassword = await bcrypt.hash(password, saltUser);
      if (oldPassword != null && oldPassword != undefined) {
        const hashOldPassword = await bcrypt.hash(oldPassword, saltUser);
        if (user.password === hashOldPassword) {
          user.set({
            password: `${hashPassword}`
          });
          await user.save();
          res.status(200).send({
            status: 200,
            message: "User data changed."
          });
        }
          res.status(404).send({
            status: 404,
            message: "Passwords is not equals."
          });
      }
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

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          status: 200,
          data: data,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: `Error retrieving User with id=${id}.`
      });
    });
};


exports.findAll = (req, res) => {
  User.findAll({ where: {} })
    .then(data => {
      res.status(200).send({
        status: 200,
        data: data,
        message: "Users retrieved successfully!"
      })
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};





