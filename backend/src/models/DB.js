const mysql = require("mysql");
const dbConfig = require("../configs/DBConfig");

const dbConnection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    dateStrings: dbConfig.DATE_STRINGS
});

dbConnection.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database.");
});

module.exports = dbConnection;