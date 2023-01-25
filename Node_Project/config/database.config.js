module.exports = {
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "docker12Maria", 
    database: "test_sequelize", 
    dialect: "mysql", 
    pool: {
        max: 5, 
        min: 0
    }
}; 