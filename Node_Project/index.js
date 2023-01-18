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



//Signup post
app.post('/api/signupUser', async (req, res) => {
     const nome = req.body.fullnameUser;
     const cognome = req.body.lastnameUser;
     const email = req.body.emailUser;
     const password = req.body.passwordUser;
     const saltUser = await bcrypt.genSalt();
     const tmp = password + secret;
     const hashedPassword = await bcrypt.hash(tmp, saltUser);
     console.log(nome, cognome, email, password, saltUser, hashedPassword);
     let sql = `INSERT into user (nome, cognome, email, salt, password, restrizioni) values ('${nome}', '${cognome}', '${email}', '${saltUser}', '${hashedPassword}', 0);`
     db.query(sql, (err, res) =>{
        if(err) throw err;
        console.log("Account inserito");
     })
    });


app.post('/api/loginUser', function (req, res) {
    
    /** 
    db.query(sql, (err, res) => {
        result = Object.values(JSON.parse(JSON.stringify(res)));
        passwordInDb = result[0].password; 
        saltInDb = result[0].salt; 
        const tmp = password + secret; 
        console.log("Tmp : " + tmp);
        const hashedPassword = bcrypt.hash(tmp, saltInDb);
        console.log("Hashed password : " + hashedPassword);
    }); 
    */
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
