module.exports = app => {
    
    //Require Employee controller for methods
    const employee = require('../controllers/employee_controller.js'); 
    
    const auth = require("../auth/jwtController");

    //Require express connection
    var router = require('express').Router(); 

    //Route for Signup Employee
    router.post("/signup", employee.create);

    //Route for delete Employee Account by id
    router.post("/delete/:id", employee.delete); 

    //Route for update Employee value by id 
    router.post("/update/:id", employee.update); 

    //Route for find Employee by id
    router.get("/find/:id", employee.find); 

    //Route for find all Employee
    router.get("/findAll", employee.findAll);

    //Route for Employee Login 
    router.get("/login", employee.login);

    //Route for Employee Logout
    router.post("/logout", auth.authenticateTokenEmployee, (req, res, next) => {
        employee.logout(req, res, next);
    }) 
    

    //Route for this module : 
    app.use('/api/employee', router);
}