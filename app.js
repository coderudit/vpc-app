const express = require("express");
const app = express();
const router = require("./routers/routes");
const { secretManager } = require("./controllers/secretmanager");
const { username } = require("./controllers/config");
//const { connectToMysql } = require("./mysql/mysqlConnect");

app.use(express.json());

app.use("/", router);

app.listen(8000, () => {
  console.log("VPC app started.");
  secretManager();
});
