const express = require('express'); 
const app = express(); 


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


 //Prove mandando un nome dell'animale e la descrizione ad un altro indirizzo. 
 app.get('/api/nomeAnimale', function(req, res){
    var nomeAnimale = 'Bimbo'
    res.json(nomeAnimale);
 });

 app.get('/api/descriptionAnimal', function(req, res){
    var descrizione = 'Cane molto bello, prova descrizione' 
    res.json(descrizione);
});

//Prova di una lista di card con nome, quindi prendendo dati 
//da un file json in modo specifico: 
app.get('/api/arrayAnimal', function(req, res){
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



 /**
  * RICEZIONE DATI DAL FRONTEND
  * Rotte per ricevere dati
  */

 app.post('/api/login', function(req, res, next){
    var data = req.body;
    console.log(data);
 })

//Server start at 3000.
console.log("Server start at port : 3000 ...")
app.listen(3000);



//ESEMPIO PRATICO DI INVIO DATI
/**
 * Questa chiamata ci ritorna i post di instragram
 * che vogliamo vedere. Quindi ci dovrà ritornare un qualcosa
 * di array. 
 */
app.get('/api/feed', function(req,res){
    //connessione al db
    //avrò i miei amici da visualizzare nei feed
    //alloco come risultato un array, che simula un risultato
    //di una select.
    var myFeed = [
         {
            id: '1', 
            name: 'Pippo', 
            like: '123'
         },
         {
            id: '2', 
            name: 'Pluto', 
            like: '2'
         },
    ];

    //Devo inviare questa cosa al Front-end che mi ha fatto la chiamata (inviare del json)
    res.json(myFeed);
})