module.exports = app => {

    //Require User controller for call methods for Routes
    const user = require('../controllers/user_controller');

    //Require JWT Controller for call JWT Method in Header Route
    const auth = require("../auth/jwtController");

    //Require express connection 
    var router = require('express').Router();

    // ---- AUTHENTICATION ROUTES -----

    router.post("/registration", user.create);

    router.post("/login", user.login);

    router.post("/logout", user.logout); 

    router.post("refreshToken", user.refreshToken); 

    // ---- OTHER ROUTES ----

    //Route for delete User by Id
    router.post("/delete/:id", user.delete);

    //Route for update User account
    router.post("/update/:id", user.update);

    //Route for find User by Id
    router.get("/find/:id", user.find);

    //Route for find all User
    router.get("/findAll", user.findAll);


    //Route for this module : 
    app.use('/api/user', router);

}