const express = require("express");
const app = express();
const router = require("./routers/routes");
const { secretManager, username } = require("./mysql/secretmanager");
//const { connectToMysql } = require("./mysql/mysqlConnect");

app.use(express.json());

app.use("/", router);

app.listen(8000, () => {
  console.log("VPC app started.");
  secretManager();
  //console.log(username);
  //connectToMysql();
});
