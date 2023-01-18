//Require Express Connection
const express = require('express');
const app = express();

//Require Json parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Require BeCrypt : 
const bcrypt = require ('bcrypt');
const secret = "!Rj(98bC%9sVn&^c";
const saltRounds = 10; 

//Require DataBase connection
const db = require("./database");


//Part that contains all Get Call 
app.get('/api/home', function (req, res) {
    var nome = 'Pagina Home'
    res.json(nome);
});

app.get('/api/contact', function (req, res) {
    var nome = 'Pagina Contatti'
    res.json(nome);
})

app.get('/api/info', function (req, res) {
    var nome = 'Pagina Informazioni'
    res.json(nome);
})

app.get('/api/login', function (req, res) {
    var nome = 'Pagina Login'
    res.json(nome);
});

app.get('/api/arrayAnimal', function (req, res) {
    //connessione al db
    //avrò i miei amici da visualizzare nei feed
    //alloco come risultato un array, che simula un risultato
    //di una select.
    var myCardArray = [
        {
            id: "1",
            nomeAnimale: "Pluto",
            colore: "Marrone",
            descrizione: "Descrizione di Pluto: cane marrone"
        },
        {
            id: "2",
            nomeAnimale: "Pippo",
            colore: "Nero",
            descrizione: "Descrizione di Pippo: cane nero"
        },
        {
            id: "3",
            nomeAnimale: "Scafo",
            colore: "Bianco",
            descrizione: "Descrizione di Scafo: cane bianco"
        }
    ];

    res.json(myCardArray);
});




//Part that contains all DataBase connectio Call
app.get('/api/insertSofia', function (req, res) {
    let sql = "select nome, cognome from user where nome like 'Sofia';";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(res);
        console.log("Account trovato : " + res);
    })

});


//Server start at 3000.
console.log("Server start at port : 3000 ...")
app.listen(3000);


/**
 * //Part that contains all Post call:

app.post('/api/loginUser', function(req, response, next){
    let  email = req.body.emailUser;
    let  password = req.body.passwordUser;
    console.log('Received this data : Email --> ' + email + " Password --> " + password);
    let sql = `select salt, password from user where email like '${email}'`; 
    db.query(sql, (err, res) => {
        if(err) console.log(err); 
        let result = Object.values(JSON.parse(JSON.stringify(res)));
        let saltUser = result[0].salt; 
        let passwordUser = result[0].password; 
        console.log("Salt user : " + saltUser + "Password user : " + passwordUser);
        bcrypt.genSalt(saltRounds, function(err, salt){
            saltGenerated = salt; 
            bcrypt.hash(password, saltGenerated, function(err, hash){
                hashedPassword = hash; 
                if(bcrypt.compare(passwordUser, hashedPassword)) {
                    console.log("Successful Login!!");
                }
            });
        });
    }); 
}); 
 */