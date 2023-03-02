module.exports = app => {

    
    const booking = require('../controllers/booking_controller.js'); 

    var router = require('express').Router(); 

    //Init the routes : 
    router.post("/create", booking.create);

    router.post("/update/:id", booking.update);

    router.post("/delete/:id", booking.delete);

    router.post("/deleteAll", booking.deleteAll);

    router.get("/find/:id", booking.find);

    router.get("/findAll", booking.findAll);

    router.get("/findOne/:id", booking.findOne);

    router.get("/findFree", booking.findFreeBooking);

    router.get("/findAllCompleted", booking.findAllCompleted);


    //Route for this module : 
    app.use('/api/booking', router);
}