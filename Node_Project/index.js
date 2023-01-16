//Require Express Connection :
const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 

//Require .js files: 
const db = require('./dbrequest');
const get = require('./get');
const post = require('./post');

//Parse for Json file:
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Server start : 
console.log("Server start at port : 3000 ...")
app.listen(3000);

