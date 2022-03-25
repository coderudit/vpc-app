const express = require("express");
const app = express();
const router = require("./routers/routes");
//const { connectToMysql } = require("./mysql/mysqlConnect");
const { secretReturn } = require("./mysql/secretmanager");

app.use(express.json());

app.use("/", router);

app.listen(8000, () => {
  console.log("VPC app started.");
  //const secret = await secretReturn;
  console.log("Secret: " + Object.getOwnPropertyNames(secretReturn));
  console.log("Secret: " + secretReturn);
  //connectToMysql();
});
