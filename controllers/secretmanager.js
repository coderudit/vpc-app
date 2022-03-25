// https://aws.amazon.com/developers/getting-started/nodejs/
const mysql = require("mysql");
const accessKeyId = "AKIAXKBPMQVLW56QHH6C"; //process.env.AWS_ACCESS_KEY;
const secretAccessKey = "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"; //process.env.AWS_SECRET_ACCESS;

// Load the AWS SDK
var AWS = require("aws-sdk"),
  region = "us-east-1",
  secretName = "ProductionDB",
  secret,
  decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
  region: region,
  accessKeyId,
  secretAccessKey,
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

let username, password, port, dbName, host, db;
const secretManager = () => {
  client.getSecretValue({ SecretId: secretName }, function (err, data) {
    if (err) {
      console.log("Error in secret manager: " + JSON.stringify(err));
      if (err.code === "DecryptionFailureException")
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InternalServiceErrorException")
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidParameterException")
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidRequestException")
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "ResourceNotFoundException")
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
    } else {
      // Decrypts secret using the associated KMS key.
      // Depending on whether the secret is a string or binary, one of these fields will be populated.
      if ("SecretString" in data) {
        secret = data.SecretString;
        let secretObject = JSON.parse(secret);
        username = secretObject.username;
        password = secretObject.password;
        port = secretObject.port;
        dbName = secretObject.dbname;
        host = secretObject.host;

        db = mysql.createConnection({
          host: host,
          port: port,
          user: username,
          password: password,
        });

        const connectToMysql = () => {
          console.log(username, password, port, dbName, host);
          db.connect((err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("DB Connected");
          });
        };

        connectToMysql();
      } else {
        let buff = new Buffer(data.SecretBinary, "base64");
        decodedBinarySecret = buff.toString("ascii");
      }
    }
  });
};

module.exports = { secretManager, db };
