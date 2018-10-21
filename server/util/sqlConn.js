const mysql = require("mysql");
const fs = require("fs");

// const sqlConnection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'invm'
// });
const sqlConnection = mysql.createConnection({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

const closeConn = callback => {
  sqlConnection.end(err => {
    if (err) {
      fs.appendFileSync("./server/util/errors.txt", err + "\n");
      process.exit(1);
    }
    callback();
  });
};

const startConn = callback => {
  sqlConnection.connect(err => {
    if (err) {
      fs.appendFileSync("./server/util/errors.txt", err + "\n");
      process.exit(1);
    }
    callback(sqlConnection.threadId);
  });
};

module.exports = {
  sqlConnection,
  closeConn,
  startConn
};
