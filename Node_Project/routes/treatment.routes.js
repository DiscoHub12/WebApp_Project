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
    router.put("/create", authenticate.authenticateTokenUser, treatment.create);

    /**
     * This route allows you to get a specific Treatment, 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", treatment.find);

    /**
     * This route allows you to get all Treatments.
     */
    router.get("/findAll", treatment.findAll);

    /**
     * This route allows you to get all Treatments for a 
     * specific User, passing the corresponding and unique id as parameters.
     */
    router.get("/findAllUser/:id", treatment.findOne);


    
    //Route for this module : 
    app.use('/api/treatment', router);

}