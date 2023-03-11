/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the Treatment model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of Treatment model, so as t call the
     * corrisponding methods when requests are made.
     */
    const treatment = require("../controllers/treatment_controller");

    /**
     * Variable that allows you to call methods for authentication, 
     * jwt and more.
     */
    const authenticate = require('../auth/jwtController.js');

    /**
     * Variable used for Routing, it allows you to 
     * export this file using the router app 'router'.
     */
    var router = require("express").Router();



    /**
     * This route allows you to create a new Treatment.
     */
    router.put("/create", authenticate.authenticateTokenEmployee, treatment.create);

    /**
     * This route allows you to get a specific Treatment, 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", authenticate.authenticateTokenUser, treatment.find);

    /**
     * This route allows you to get all Treatments.
     */
    router.get("/findAll", authenticate.authenticateTokenEmployee, treatment.findAll);

    /**
     * This route allows you to get all Treatments for a 
     * specific User, passing the corresponding and unique id as parameters.
     */
    router.get("/findAllUser", authenticate.authenticateTokenUser, treatment.findOne);

    /**
     * This route allows you to delete a specific Treatment, 
     * passing the corresponding and unique id as parameters.
     */
    router.delete("/delete/:id", authenticate.authenticateTokenEmployee, treatment.delete);


    
    //Route for this module : 
    app.use('/api/treatment', router);

}