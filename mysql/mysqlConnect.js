const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "vpc-db",
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

module.exports = { connectToMysql };
