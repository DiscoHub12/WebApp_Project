require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Array that contains all refresh tokens.
 */
let refreshTokens = [];

function addRefreshToken(token) {
    this.refreshTokens.push(token);
    console.log("Token aggiunto : " + token);
}

function containsToken(token) {
    return this.refreshTokens.includes(token);
}

/**
 * Function that return the JWT Access Token for User.
 * @param {*} the user to returns the JWT.
 */
function getAccessTokenUser(user) {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

/**
 * Function that returns the JWT Refresh Token for User.
 * @param {*} the user to returns the refresh JWT Token.  
 */
function getRegfreshTokenUser(user) {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
}

/**
 * Function that return the JWT Access token for Employee.
 * @param {*}  the employee to returns the JWT.
 */
function getAccessTokenEmployee(employee) {
    return jwt.sign({ id: employee.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

/**
 * Function that returns the JWT Refresh Token for Employee.
 * @param {*} the employee to returns the refresh JWT token.
 */
function getRegfreshTokenEmployee(employee) {
    return jwt.sign({ id: employee.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
}

/**
 * function that returns User by token if is possibile.
 * @param {String} token. 
 */
function getUserByToken(token) {
    let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) {
        return res.status(403).send("Token is not valid!");
    }
    return user;
}

/**
 * Function that returns Employee by token if is possible.
 * @param {String} token.
 */
function getEmployeeByToken(token) {
    let employee = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!employee) return res.status(403).send("Token is not valid.");
    return employee;
}

/**
 * Function that returns User by RefreshToken if is possibile. 
 * @param {String} token 
 */
function getUserByRefreshToken(token) {
    let user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!user) return res.status(403).send("Token is not valid!");
    return user;
}

/**
 * Function that returns Employee by RefreshToken if is possible.
 * @param {String} token 
 */
function getEmployeeByRefreshToken(refreshToken) {
    let employee = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!employee) return res.status(403).send("Token is not valid");
    return employee;
}

/**
 * Middleware to verify the authorization for User.
 */
function authenticateTokenUser(req, res, next) {
    let authHeader = req.headers['authorization'];
    if (authHeader) {
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send("Token is not valid!");
            req.user = user;
            next();
        })
    } else return res.status(401).send("You are not authenticated!");1
}

/**
 * Middleware for verify the authorization for Employee.
 */
function authenticateTokenEmployee(req, res, next) {
    let authHeader = req.headers['authorization'];
    if (authHeader) {
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send({
                status: 403, 
                message : "Token is not valid!",
            });
            req.user = user;
            next();
        })
    } else return res.status(401).send("You are not authenticated!");
}

module.exports =
{
    refreshTokens,
    getAccessTokenUser,
    getAccessTokenEmployee,
    getRegfreshTokenUser,
    getRegfreshTokenEmployee,
    getUserByToken,
    getEmployeeByToken,
    getUserByRefreshToken,
    getEmployeeByRefreshToken,
    authenticateTokenUser,
    authenticateTokenEmployee,
    addRefreshToken,
    containsToken,
};