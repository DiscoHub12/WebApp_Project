//require express connection for post and get HTTP
const express = require('express'); 
const app = express();

//parse requests of content-type application/json
app.use(express.json());

//parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

//Require for the db file to connect to the Database.
const db = require('./config/database.js');
//Require User and Gifts model to create associations.
const user = require('./models/user.js'); 
const gifts = require('./models/gifts.js'); 

//Require all Routes file.
require('./routes/employee.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/card.routes.js')(app);
require('./routes/gifts.routes.js')(app); 
require('./routes/booking.routes.js')(app);
require('./routes/treatment.routes.js')(app);

//Create associations between User and Gifts.
user.belongsToMany(gifts, { through: 'UserRewards' } ); 
gifts.belongsToMany(user, { through: 'UserRewards'});

//Sync the Database connections.
db.sync().then(() => {
    console.log("Synced db."); 
}).catch((err) => {
    console.log("Failed to sync db : " + err.message);
}); 

//Server start at port 3000.....
app.listen(3000); 
console.log("Server start at 3000...");