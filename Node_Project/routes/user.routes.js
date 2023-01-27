module.exports = app => {

    const user = require('../controllers/user_controller');

    var router = require('express').Router();

    //Init the routes :
    router.post("/signup", user.create);

    router.post("/delete/:id", user.delete);

    router.post("/deleteAll", user.deleteAll);

    router.get("/find/:id", user.find);

    router.get("/findAll", user.findAll);

    router.post("/update/:id", user.update);

    
    //Route for this module : 
    app.use('/api/user', router);

}