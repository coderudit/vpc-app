const { secretManager } = require("./secretmanager");
const mysql = require("mysql");
//const { connectToMysql, db } = require("./mysqlConnect");
const { configObject } = require("./config");

const db = mysql.createConnection({
  host: "rob-db.cluster-ccw2rrjqpyvt.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "Passw0rd",
  database: "studentsdb",
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

const storeStudentsInRDS = async (req, res) => {
  console.log("storeStudentsInRDS called.");
  //console.log(configObject);
  //console.log(configObject.username);
  connectToMysql();

  var { students } = req.body;

  console.log(students);
  /*db.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Inserting data.");
    for (let index = 0; index < students.length; index++) {
      console.log(students[index].first_name);
      console.log(students[index].last_name);
      console.log(students[index].banner);
      db.query(
        `INSERT INTO students(first_name, last_name, banner) VALUES ('${students[index].first_name}, '${students[index].last_name}', '${students[index].banner}')')`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    }
  });*/
};

const getStudentsFromRDS = async (req, res) => {
  //secretManager();
  db.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Querying data.");

    db.query(`SELECT * FROM students;`, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });
};

module.exports = { storeStudentsInRDS, getStudentsFromRDS };
