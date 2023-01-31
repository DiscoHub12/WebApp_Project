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

}

/**
 * Function that returns the JWT Refresh Token for Employee.
 * @param {*} the employee to returns the refresh JWT token.
 */
function getRegfreshTokenEmployee(employee){

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
function getEmployeeByRefreshToken(token){

}

/**
 * Middleware to verify the authorization.
 */
function authenticateToken(req, res, next){

}

module.exports = {refreshTokens, getAccessTokenUser, getAccessTokenEmployee, getRegfreshTokenUser, getRegfreshTokenEmployee, getUserByToken, getEmployeeByToken, getUserByRefreshToken, getEmployeeByRefreshToken, authenticateToken};