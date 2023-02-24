const User = require(`./user`); 
const Gifts = require(`./gifts`); 

//Stabilisce la relazione in modo tale che lo User può ricvedere più regali.
User.belongsToMany(Gifts, {through: 'UserReward'});

//Stabilisco la relazione molti a molti in modo tale che un Premio può essere riscattato
//da molti utenti.
Gifts.belongsToMany(User, {through: 'UserReward'}); 

