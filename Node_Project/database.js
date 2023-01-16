//Require the mySQL library:
const mysql = require('mysql'); 

//Create connection and export: 
module.exports = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "docker12Maria", 
    database: "application_web",
    connectionLimit: 10, 
    port: 3306
});