module.exports = app => {
    const card = require('../controllers/card_controller.js'); 

    var router = require('express').Router(); 

    router.post("/create", card.create);

    router.post("/delete/:id", card.delete); 

    router.post("/addPoints/:id", card.addPoints); 

    router.post("/addPointsAll", card.addPointsAll); 

    router.post("/removePoints/:id", card.removePoints);

    router.post("/removePointsAll", card.removePointsAll);

    router.get("/find/:id", card.find); 

    router.get("/findAll", card.findAll);

    //Route for this module : 
    app.use('/api/card', router);
}