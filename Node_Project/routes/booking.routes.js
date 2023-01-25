module.exports = app => {
    const booking = require('../controllers/booking_controller.js'); 

    var router = require('express').Router(); 

    //Init the routes : 
    router.post("/create", booking.create);

    router.post("/delete/:id", booking.delete);

    router.post("/deleteAll", booking.deleteAll);

    router.get("/find/:id", booking.find);

    router.get("/findAll", booking.findAll);

    router.get("/findAllCompleted", booking.findAllCompleted)

    router.post("/update/:id", booking.update);


    //Route for this module : 
    app.use('/api/booking', router);
}