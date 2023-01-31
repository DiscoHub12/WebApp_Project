require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Array that contains all refresh tokens.
 */
let refreshTokens = [];

/**
 * Function that return the JWT Access Token for User.
 * @param {*} the user to returns the JWT.
 */
function getAccessTokenUser(user){

}

/**
 * Function that returns the JWT Refresh Token for User.
 * @param {*} the user to returns the refresh JWT Token.  
 */
function getRegfreshTokenUser(user){
   
}

/**
 * Function that return the JWT Access token for Employee.
 * @param {*}  the employee to returns the JWT.
 */
function getAccessTokenEmployee(employee){
    return jwt.sign({ id: employee.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN});
}

/**
 * Function that returns the JWT Refresh Token for Employee.
 * @param {*} the employee to returns the refresh JWT token.
 */
function getRegfreshTokenEmployee(employee){
    return jwt.sign({ id: employee.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
}

/**
 * function that returns User by token if is possibile.
 * @param {String} token. 
 */
function getUserByToken(token){

}

/**
 * Function that returns Employee by token if is possible.
 * @param {String} token.
 */
function getEmployeeByToken(token){
    let employee = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!employee) return res.status(403).send("Token is not valid."); 
    return employee;
}

/**
 * Function that returns User by RefreshToken if is possibile. 
 * @param {String} token 
 */
function getUserByRefreshToken(token){

}

/**
 * Function that returns Employee by RefreshToken if is possible.
 * @param {String} token 
 */
function getEmployeeByRefreshToken(refreshToken){
    let employee = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if(!employee) return res.status(403).send("Token is not valid");
    return employee;
}

/**
 * Middleware to verify the authorization.
 */
function authenticateTokenUser(req, res, next){
   
}

/**
 * Middleware for verify the authorization for Employee.
 */
function authenticateTokenEmployee(req, res, next){
    const autHeader = req.headers['authorization']; 
    const token = autHeader && autHeader.split(' ')[1]; 
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, employee) => {
        if(err) return res.sendStatus(403);
        req.employee = employee;
        next();
    });
}

module.exports = {refreshTokens, getAccessTokenUser, getAccessTokenEmployee, getRegfreshTokenUser, getRegfreshTokenEmployee, getUserByToken, getEmployeeByToken, getUserByRefreshToken, getEmployeeByRefreshToken, authenticateToken};