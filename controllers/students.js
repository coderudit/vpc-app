const {
  SecretsManagerClient,
  CancelRotateSecretCommand,
} = require("@aws-sdk/client-secrets-manager");

const storeStudentsInRDS = async (req, res) => {
  console.log("storeStudentsInRDS called.");

  var { students } = req.body;
  console.log(students);

  for (let index = 0; index < students.length; index++) {
    console.log(students[index].first_name);
    console.log(students[index].last_name);
    console.log(students[index].banner);
  }
};

const getStudentsFromRDS = async (req, res) => {
  console.log("getStudentsFromRDS called.");
};

module.exports = { storeStudentsInRDS, getStudentsFromRDS };
