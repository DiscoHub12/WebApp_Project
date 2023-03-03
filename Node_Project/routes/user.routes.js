/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the User model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of User model, so as t call the
     * corrisponding methods when requests are made.
     */
    const user = require('../controllers/user_controller');

    /**
     * Variable used for Routing, it allows you to 
     * export this file using the router app 'router'.
     */
    var router = require('express').Router();


    /**
     * This route allows you the registration of a new 
     * User within the Platform.
     */
    router.post("/registration", user.create);

    /**
     * This route allow User to log in.
     */
    router.post("/login", user.login);

    /**
     * This route allows you to logout the User logged into 
     * the Platform.
     */
    router.post("/logout", user.logout);

    /**
     * This route allows you to get a new refresh-token for the User 
     * logged into the Platform.
     */
    router.post("refreshToken", user.refreshToken);

    /**
     * This route allows you to update data for a specific User, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/update/:id", user.update);

    /**
     * This route allows you to delete a specific User account, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/delete/:id", user.delete);

    /**
     * This route allows you to get a specific User, 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", user.find);

    /**
     * This route allows you to get all User accounts registered.
     */
    router.get("/findAll", user.findAll);


    //Route for this module : 
    app.use('/api/user', router);

}