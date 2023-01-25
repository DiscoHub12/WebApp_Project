module.exports = app => {
    const card = require('../controllers/card_controller.js'); 

    var router = require('express').Router(); 

    //Init the routes : 
    router.post("/create", card.create);

    //Route for this module : 
    app.use('/api/card', router);
}