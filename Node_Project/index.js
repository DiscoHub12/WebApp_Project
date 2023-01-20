//Require Express Connection
const express = require('express');
const app = express();

//Require Json parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Require BeCrypt : 
const bcrypt = require('bcrypt');
const secret = "!Rj(98bC%9sVn&^c";


//Require DataBase connection
const db = require("./database");
const e = require('express');


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




//Signup post : 
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
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log("Account inserito");
    })
});

//Login post :
app.post('/api/loginUser', function (request, responseApi) {
    const email = request.body.emailUser;
    const password = request.body.passwordUser + secret;
    console.log("Email ricevuta : " + email + "Password ricevuta + secret : " + password);

    //Controlli i capi vuoti o undefined(anche se controllati già nel Frontend)
    if (email == undefined || email == "" || password == undefined || request.body.password == "") {
        console.log("Email o Password nulle.");
        responseApi.status(401).json({
            message: "Fill all Fields.",
            status: responseApi.statusCode
        });
    }

    //Controllo se la email esiste, se esiste prendo la password: 
    let sql = `SELECT nome, cognome, email, password from user where email like '${email}'`;
    db.query(sql, (err, res) => {
        if (err || res == "") {
            console.log("Email inesistente.");
            responseApi.status(401).json({
                message: "Email not exist.",
                status: responseApi.statusCode
            });
        } else {
            let result = Object.values(JSON.parse(JSON.stringify(res)));
            let nomeDb = result[0].nome;
            let cognomeDb = result[0].cognome;
            let emailDb = result[0].email;
            let passwordDb = result[0].password;
            bcrypt.compare(password, passwordDb, (err, res) => {
                if (err || res == "") {
                    console.log("Password not correct.");
                    responseApi.status(401).json({
                        message: "Password not correct.",
                        status: responseApi.statusCode
                    });
                }else {
                    responseApi.status(201).json({
                        message: "Login successfylly",
                        nome: `${nomeDb}`,
                        cognome: `${cognomeDb}`,
                        email: `${emailDb}`,
                        status: responseApi.statusCode
                    });
                    console.log("SUCCESSO.");
                }
            })
        }
    })
})



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
 * ESEMPIO LOGIN 1:
app.post('/api/loginUser', function (req, response) {
    const email = req.body.emailUser;
    const password = req.body.passwordUser + secret;
    console.log("Email : " + email + " Password : " + password);
    let sql = `SELECT nome, cognome, email, password from user where email like '${email}'`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(res)));
        const passwInDb = result[0].password;
        bcrypt.compare(password, passwInDb, (err, result) => {
            if (result) {
                response.send("SUCCESSO");
                console.log("Invio successo.");
            }else {console.log("INSUCCESS.")};
        })
    });
});
*/
