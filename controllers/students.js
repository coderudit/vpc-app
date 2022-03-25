const { secretManager, db } = require("./mysql/secretmanager");

const storeStudentsInRDS = async (req, res) => {
  secretManager();
  console.log("storeStudentsInRDS called.");

  var { students } = req.body;
  console.log(students);

  db.connect((err) => {
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
  });
};

const getStudentsFromRDS = async (req, res) => {
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
