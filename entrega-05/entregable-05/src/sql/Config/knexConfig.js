//usuario root
const dbConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "dsuser",
    password: "123456789",
    database: "coderhouse"
}
// const knex = require("knex")({
//     client: "mysql",
//     connection: {
//       host : "localhost",
//       port : 3306,
//       user: "dsuser",
//       password: "123456789",
//       database: "coderhouse"
//     }
//   });
/*
const dbConfig = {
    filename: "./db.sqlite3",
}*/
 const knexConfig = {
        client: "mysql",
        connection: dbConfig
    }
    /*
const knexConfig = {
    client: "sqlite3",
    connection: dbConfig,
    useNullAsDefault: true
}
*/
module.exports = knexConfig