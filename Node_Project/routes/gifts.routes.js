/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the Gifts model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of Gifts model, so as t call the
     * corrisponding methods when requests are made.
     */
    const gifts = require('../controllers/gifts_controller.js');

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
     * This route allows you to create a new Reward.
     */
    router.post('/create', authenticate.authenticateTokenEmployee, gifts.create);

    /**
     * This route allows you to update a data of a specific Reward, 
     * passing the corresponding and unique id as parameters.
     */
    router.post('/update/:id', gifts.update);

    /**
     * This route allows you to delete a specific Reward, 
     * passing the corresponding and unique id as parameters.
     */
    router.post('/delete/:id', authenticate.authenticateTokenEmployee, gifts.delete);

    /**
     * This route allows you to get data of a specific Reward, 
     * passing the corresponding and unique id as parameters.
     */
    router.get('/find/:id', gifts.find);

    /**
     * This route allows you to get all created Rewards.
     */
    router.get('/findAllGiftsEmployee', authenticate.authenticateTokenEmployee, gifts.findAll);

    router.get('/findAllGiftsUser', authenticate.authenticateTokenUser, gifts.findAll);

    /**
     * This route allows you to gett all User retreived Rewards, 
     * passing the corresponding and unique id as parameters.
     */
    router.get('/findAllUser/:id', authenticate.authenticateTokenUser, gifts.findAllUser);

    /**
     * This route allows you to take all Users who have reedemed
     * and are in the process of least one Reward.
     */
    router.get(`/findAllUserReedem`, authenticate.authenticateTokenEmployee, gifts.findAllUserReedem);

    /**
     * This route allows you to add a specific Reward for a 
     * specific User.
     */
    router.post('/addReward', authenticate.authenticateTokenUser, gifts.addReward);

    /**
     * This route allows you to remove a specific Reward for a 
     * specific User.
     */
    router.post('/removeReward', gifts.removeReward);



    //Router for this Module.
    app.use('/api/gifts', router);

}