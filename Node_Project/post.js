/**
 * File that contains all post calls.
 */

//Example : get data from Frontend.
app.post('/api/login', function(req, res, next){
    res.json(req.body);
    console.log(req.body);
 });


