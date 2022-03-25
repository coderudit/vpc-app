const mysql = require("mysql");
const { secretManager } = require("./secretmanager");

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
    console.log("Connected to database.");
  });
};

const storeStudentsInRDS = async (req, res) => {
  console.log("Store students in RDS called.");
  const { students } = req.body;
  for (let index = 0; index < students.length; index++) {
    console.log(students[index].first_name);
    console.log(students[index].last_name);
    console.log(students[index].banner);
    db.query(
      `INSERT INTO students (first_name, last_name, banner) VALUES ('${students[index].first_name}', '${students[index].last_name}', '${students[index].banner}')`,
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) res.sendStatus(201);
      }
    );
  }
};

const getStudentsFromRDS = async (req, res) => {
  console.log("Get students from RDS called.");

  db.query(`SELECT * FROM students;`, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.send(result);
  });
};

module.exports = { storeStudentsInRDS, getStudentsFromRDS, connectToMysql };
