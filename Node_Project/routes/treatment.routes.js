module.exports = app => {

    const treatment = require("../controllers/treatment_controller");
    var router = require("express").Router();


    //Init the routes :
    router.post("/create", treatment.create);

    router.get("/find/:id", treatment.find);

    router.get("/findAll", treatment.findAll);


    //Route for this module : 
    app.use('/api/treatment', router);

}