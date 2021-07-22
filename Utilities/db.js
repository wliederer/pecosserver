// const mysql = require("mysql");
//commented this all out because i discovered sequelize

// //connect to DB
// function connectDb() {
//     const db = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "pecos"
//     })
//     db.connect(err => {
//         if (err) {
//             console.log("error connecting to db are you running mysql or have DB pecos created?");
//             throw err;
//         }
//         console.log("mysql connected");
//     })
//     return db;
// }
// //create DB with admin
// function createTable() {
//     db = connectDb();
//     let sql = "CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id), UNIQUE(username))";
//     db.query(sql, err => {
//         if (err) {
//             console.log("error creating table");
//             throw err;
//         } console.log("table created");
//     })
//     let post = { username: "admin", password: "admin" };
//     sql = "INSERT INTO users SET ?";
//     db.query(sql, post, err => {
//         if (err) {
//             console.log("issue creating admin");
//             throw err;
//         }
//         db.end();
//         console.log("database created with table users and entry admin");
//     })
// }
// module.exports = {
//     connectDb,
//     createTable
// }