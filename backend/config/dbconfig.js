// Stores the connection of the localhost
// Online is https://hospitaldb1-11.herokuapp.com/
const pgp = require("pg-promise")()

const connectionString = "postgres://postgres:postgres@localhost:5432/postgres"
const dbconnect = pgp(connectionString)

module.exports = dbconnect;