const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST, //"rob-db.cluster-ccw2rrjqpyvt.us-east-1.rds.amazonaws.com",
  port: process.env.DB_PORT, //3306
  user: process.env.DB_USER, //"admin",
  password: process.env.DB_PASSWORD, //"Passw0rd",
  database: process.env.DB_NAME, //"studentsdb",
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
    }
  });
};

const storeStudentsInRDS = async (req, res) => {
  console.log("storeStudentsInRDS called.");
  console.log(process.env.username);
  const { students } = req.body;
  console.log(students);
  connectToMysqlAndInsertData(students);
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
