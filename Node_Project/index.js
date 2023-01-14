const bodyParser = require('body-parser');
const express = require('express'); 
const app = express(); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


/**
 * INVIO DATI AL FRONTEND
 * Rotte per inviare dati. 
 */
app.get('/api/home', function(req, res){
    var nome = 'Pagina Home'
    res.json(nome);
});

app.get('/api/contact', function(req, res){
    var nome = 'Pagina Contatti'
    res.json(nome);
})

app.get('/api/info', function(req, res){
    var nome = 'Pagina Informazioni'
    res.json(nome);
})

app.get('/api/login', function(req, res){
    var nome = 'Pagina Login'
    res.json(nome);
 });


//TEST : send data to Frontend (Angular) :
 app.get('/api/nomeAnimale', function(req, res){
    var nomeAnimale = 'Bimbo'
    res.json(nomeAnimale);
 });

 app.get('/api/descriptionAnimal', function(req, res){
    var descrizione = 'Cane molto bello, prova descrizione' 
    res.json(descrizione);
});


/**
 * ESEMPIO PRATICO DI INVIO DATI (ARRAY)
 * Questa chiamata ci ritorna i post di instragram
 * che vogliamo vedere. Quindi ci dovrà ritornare un qualcosa
 * di array. 
 * Prova di una lista di card con nome, quindi prendendo dati
 * da un file json in modo specifico: 
 */
app.get('/api/arrayAnimal', function(req, res){
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
})


//GET DATA FROM FRONTEND (ANGULAR)
 app.post('/api/login', function(req, res, next){
    res.json(req.body);
    console.log(req.body);
 });



//DATABASE REST API : 
const db = require('./database');

/**
 * db.query("select * from user", (error, result) => {
    if(error) throw error; 
    console.log(result);
});

 */

app.get('/api/insertSofia', function(req, res){
    let sql = "select nome, cognome from user where nome like 'Sofia';";
    db.query(sql, (err, result) => {
        if (err) throw err; 
        res.json(res);
        console.log("Account trovato : " + res);
    })

});

app.get('/api/arrayAnimalis', function(req, res){
    let sqlQuery = "select * from animali";
    db.query(sqlQuery, (error, result) => {
        if(error) console.log(error);
        res.json(result);
        console.log(result);
    })
 });



//SERVER START:
console.log("Server start at port : 3000 ...")
app.listen(3000);

