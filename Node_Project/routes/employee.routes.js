/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the Employee model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of Employee model, so as t call the
     * corrisponding methods when requests are made.
     */
    const employee = require('../controllers/employee_controller.js');

    /**
     * Variable used for Routing, it allows you to 
     * export this file using the router app 'router'.
     */
    var router = require('express').Router();



    /**
     * This route allows you the registration of a new 
     * Employee within the Platform.
     */
    router.post("/registration", employee.create);

    /**
     * This route allow Employee to log in.
     */
    router.post("/login", employee.login);

    /**
     * This route allows you to logout the Employee logged into 
     * the Platform.
     */
    router.post("/logout", employee.logout);

    /**
     * This route allows you to get a new refresh-token for the Employee 
     * logged into the Platform.
     */
    router.post("/refreshToken", employee.refreshToken)

    /**
     * This route allows you to remove a account about Employee, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/delete/:id", employee.delete);

    /**
     * This route allows you to update the data of a specific Employee, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/update/:id", employee.update);

    /**
     * This route allows you to get a specific Employee 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", employee.find);

    /**
     * This route allows you to get all the Employees account created.
     */
    router.get("/findAll", employee.findAll);



    //Route for this module : 
    app.use('/api/employee', router);
}