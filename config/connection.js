const mysql = require('mysql2')
require(dotenv).config();

const connection = mysql.createConnection({
    host:'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_NAME
  })
  
  connection.connect(function(err){
    if(err){
      throw err
    }
    console.log('connected')
  })
  module.exports = connection