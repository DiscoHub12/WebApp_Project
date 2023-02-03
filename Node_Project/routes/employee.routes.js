module.exports = app => {

    //Require Employee controller for call methods for Routes
    const employee = require('../controllers/employee_controller.js');

    //Require JWT Controller for call JWT Method in Header Route
    const auth = require("../auth/jwtController");

    //Require express connection
    var router = require('express').Router();

    // ---- AUTHENTICAITON ROUTES -----

    router.post("/registration", employee.create);

    router.post("/login", employee.login);

    router.post("/logout", employee.logout);

    router.post("/refreshToken", employee.refreshToken)

    // ---- OTHER ROUTES -----

    //Route for delete Employee Account by id
    router.post("/delete/:id", employee.delete);

    //Route for update Employee value by id 
    router.post("/update/:id", employee.update);

    //Route for find Employee by id
    router.get("/find/:id", employee.find);

    //Route for find all Employee
    router.get("/findAll", employee.findAll);


    //Route for this module : 
    app.use('/api/employee', router);
}