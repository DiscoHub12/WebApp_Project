/**
 * This .js file allows to export (then import it into the Server, 
 * in this case index.js) all the Routes regarding the requestes 
 * for the Booking model.
 * @param {*} app to export.
 */
module.exports = app => {

    /**
     * Variable used to indicate the corresponding 
     * controller of Booking model, so as t call the
     * corrisponding methods when requests are made.
     */
    const booking = require('../controllers/booking_controller.js');

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
     * This route allows you to create a new Booking.
     */
    router.post("/create", booking.create);

    /**
     * This route allows you to update a Booking, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/update/:id", booking.update);

    /**
     * This route allows you to delete a specific Booking, 
     * passing the corresponding and unique id as parameters.
     */
    router.post("/delete/:id", booking.delete);

    /**
     * This route allows you to delete all Booking existing.
     */
    router.post("/deleteAll", booking.deleteAll);

    /**
     * This route allows you to get a specific Booking, 
     * passing the corresponding and unique id as parameters.
     */
    router.get("/find/:id", booking.find);

    /**
     * This route allows you to get all Bookings existing.
     */
    router.get("/findAll", booking.findAll);

    /**
     * This route allows you to get all Bookings for a specific
     * User, passing the corresponding and unique id as parameters.
     */
    router.get("/findAllUser/:id", booking.findOne);

    /**
     * This route allows you to get all Bookings that have
     * not yet been completed.
     */
    router.get("/findAllNotCompleted", booking.findFreeBooking);

    /**
     * This route allows you to get all Bookings that have 
     * completed.
     */
    router.get("/findAllCompleted", booking.findAllCompleted);



    //Route for this module : 
    app.use('/api/booking', router);
}