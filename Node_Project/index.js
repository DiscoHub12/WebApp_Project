const express = require('express'); 
const app = express(); 

//ESEMPIO 1 LINK
app.get('/home', function(req, res){
    var counter = 10; 
    res.send('Pagina Home');
});


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

console.log("Server start at port : 3000 ...")
app.listen(3000);