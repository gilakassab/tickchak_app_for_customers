
const mysql = require('mysql2');
// const config = require('./config/config')

const pool = mysql.createPool({
  host:process.env.HOST,
  user: process.env.USER,
  database:process.env.DATABASE,
  port:process.env.PORT,
  password:process.env.PASSWORD,
}).promise();
module.exports = pool;