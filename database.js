const Sequelize = require("sequelize")

const user = "postgres" ;
const password = "insert password here" ;
const host = "localhost"
const database = "testingpassport"

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: false,
});

async function testConnection(){ 
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

testConnection() ;

module.exports = sequelize