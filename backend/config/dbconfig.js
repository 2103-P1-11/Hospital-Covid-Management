// const { Client } = require('pg')
// const client = new Client({
//   host: 'ec2-54-204-148-110.compute-1.amazonaws.com',
//   port: 5432,
//   user: 'ovqbuxfrllleer',
//   password: '28d4f78729efdc652a771d44740a3eaeaf6546bed2df8fb3377710e112423e0f',
// })

// const useCount = 0;
// const dc = '*';

// const initOptions = {/* options as documented below */
    
//     connect(client, dc, useCount) {
//         const cp = client.connectionParameters;
//         console.log('Connected to database:', cp.database);
//     }};
const pgp = require("pg-promise")()
// const connectionString = "postgres://ovqbuxfrllleer:28d4f78729efdc652a771d44740a3eaeaf6546bed2df8fb3377710e112423e0f@ec2-54-204-148-110.compute-1.amazonaws.com:5432/df5j0n69u5v6uu"
const connectionString = "postgres://postgres:postgres@localhost:5432/postgres"
const dbconnect = pgp(connectionString)

module.exports = dbconnect;