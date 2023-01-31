module.exports = app => {

    //Require user controller for methods
    const user = require('../controllers/user_controller');

    //Require express connection 
    var router = require('express').Router();

    //Router for Signup Login
    router.post("/signup", user.create);

    //Route for User login
    router.post("/login", user.login);

    //Route for delete User by Id
    router.post("/delete/:id", user.delete);

    //Route for delete all User
    router.post("/deleteAll", user.deleteAll);

    //Route for find User by Id
    router.get("/find/:id", user.find);

    //Route for find all User
    router.get("/findAll", user.findAll);

    //Route for update User account
    router.post("/update/:id", user.update);

    //Route for this module : 
    app.use('/api/user', router);

}