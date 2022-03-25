const mysql = require("mysql");
const { username, password, port, dbName, host } = require("./config");

const db = mysql.createConnection({
  host: host,
  port: port,
  user: username,
  password: password,
  database: dbName,
});

const connectToMysql = () => {
  db.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("DB Connected");
  });
};

module.exports = { connectToMysql, db };
