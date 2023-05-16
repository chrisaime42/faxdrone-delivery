require('dotenv').config();

const mysql = require('mysql');

const dbConfig = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port:process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});


module.exports = dbConfig;
