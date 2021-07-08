const Sequelize = require("sequelize");
require('dotenv').config() ;

const user = "postgres" ;
const password = process.env.DB_PASSWORD ;
const host = "localhost"
const database = "testingpassport"

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: false,
});

/**
 * TEST DATABASE CONNECTION
 * async function testConnection(){ 
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

testConnection() ;
 */


module.exports = sequelize