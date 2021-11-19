const pgp = require("pg-promise")()
// const connectionString = "postgres://ovqbuxfrllleer:28d4f78729efdc652a771d44740a3eaeaf6546bed2df8fb3377710e112423e0f@ec2-54-204-148-110.compute-1.amazonaws.com:5433/df5j0n69u5v6uu"
const connectionString = "postgres://postgres:postgres@localhost:5432/postgres"
const dbconnect = pgp(connectionString)

module.exports = dbconnect;