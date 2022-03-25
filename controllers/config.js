let username, password, port, dbName, host;

const setConfig = (username, password, port, dbName, host) => {
  this.username = username;
  this.password = password;
  this.port = port;
  this.dbName = dbName;
  this.host = host;
  console.log("Config set.");
  console.log(username, password, port, dbName, host);
};

module.exports = { setConfig, username, password, port, dbName, host };
