const mysql = require("mysql");
const { secretManager } = require("./secretmanager");

const db = mysql.createConnection({
  host: "rob-db.cluster-ccw2rrjqpyvt.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "Passw0rd",
  database: "studentsdb",
});

const connectToMysqlAndInsertData = (students) => {
  db.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("DB Connected");
    for (let index = 0; index < students.length; index++) {
      console.log(students[index].first_name);
      console.log(students[index].last_name);
      console.log(students[index].banner);
      db.query(
        `INSERT INTO students (first_name, last_name, banner) VALUES ('${students[index].first_name}', '${students[index].last_name}', '${students[index].banner}')`,
        function (err, result, fields) {
          if (err) console.log(err);
          if (result) console.log(result);
        }
      );
      return;
    }
  });
};

const storeStudentsInRDS = async (req, res) => {
  console.log("storeStudentsInRDS called.");
  secretManager();
  console.log(process.env.DB_USER);
  const { students } = req.body;
  console.log(students);
  connectToMysqlAndInsertData(students);
  return;
};

const getStudentsFromRDS = async (req, res) => {
  secretManager();
  // db.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  console.log("Querying data.");

  db.query(`SELECT * FROM students;`, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.send(result);
  });
  // });
};

module.exports = { storeStudentsInRDS, getStudentsFromRDS };
