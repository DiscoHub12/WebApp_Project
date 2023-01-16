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
