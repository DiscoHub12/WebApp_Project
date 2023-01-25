module.exports = app => {
    const employee = require('../controllers/employee_controller.js'); 

    var router = require('express').Router(); 

    router.post("/create", employee.create);

    router.post("/delete/:id", employee.delete); 

    router.post("/update/:id", employee.update); 

    router.get("/find/:id", employee.find); 

    router.get("/findAll", employee.findAll);

    //Route for this module : 
    app.use('/api/employee', router);
}