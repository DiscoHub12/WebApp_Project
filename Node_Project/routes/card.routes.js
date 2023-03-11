/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the Card model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of Card model, so as t call the
     * corrisponding methods when requests are made.
     */
    const card = require('../controllers/card_controller.js');

    /**
     * Variable that allows you to call methods for authentication, 
     * jwt and more.
     */
    const authenticate = require('../auth/jwtController.js');

    /**
     * Variable used for Routing, it allows you to 
     * export this file using the router app 'router'.
     */
    var router = require('express').Router();



    /**
     * This route allows you to create a new Card 
     * for a specific registered User.
     */
    router.post("/create", authenticate.authenticateTokenEmployee, card.create);

    /**
     * This route allows you to delete a specific Card, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/delete/:id", authenticate.authenticateTokenEmployee, card.delete);

    /**
     * This route allows you to add a specific number of points, 
     * into one specific Card.
     */
    router.post("/addPoints", authenticate.authenticateTokenEmployee, card.addPoints);

    /**
     * This route allows you to add a specific number of points, 
     * into all existing Card.
     */
    router.post("/addPointsAll", authenticate.authenticateTokenEmployee, card.addPointsAll);

    /**
     * This route allows you to remove a specific number of points, 
     * into one specific Card.
     */
    router.post("/removePoints", authenticate.authenticateTokenUser || authenticate.authenticateTokenEmployee, card.removePoints);

    /**
     * This route allows you to remove a specific number of points, 
     * into all existing Card.
     */
    router.post("/removePointsAll", authenticate.authenticateTokenEmployee, card.removePointsAll);

    /**
     * This route allows you to get a specific Card, 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", card.find);

    /**
     * This route allows you to get a specific Card from a 
     * specific User, passing the corresponding and unique id as parameters.
     */
    router.get("/findCardUser/:id", authenticate.authenticateTokenUser, card.findCardUser);

    /**
     * This route allows you to get all Cards created.
     */
    router.get("/findAll", authenticate.authenticateTokenEmployee, card.findAll);



    //Route for this module : 
    app.use('/api/card', router);
}