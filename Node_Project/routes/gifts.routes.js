module.exports = app => {

     //Require Gifts controller for call methods for Routes
    const gifts = require('../controllers/gifts_controller.js');

    //Require JWT Controller for call JWT Method in Header Route
    const auth = require("../auth/jwtController");

    //Require express connection
    var router = require('express').Router();

    //Todo aggiungere tutti i metodi per le Gifts.

    router.post('/create', gifts.create); 

    router.post('/update/:id', gifts.update); 

    router.post('/delete/:id', gifts.delete); 

    router.get('/find/:id', gifts.find); 

    router.get('/findAll', gifts.findAll);

    router.get('/findAllUser/:id', gifts.findAllUser); 

    router.post('/addReward', gifts.addReward);

    router.post('/removeReward', gifts.removeReward); 


    //Router for this Module.
    app.use('/api/gifts', router);

}