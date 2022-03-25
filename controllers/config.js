let configObject;

const setConfig = (username, password, port, dbName, host) => {
  configObject = {
    username: username,
    password: password,
    port: port,
    dbName: dbName,
    host: host,
  };
  console.log("Config set.");
  console.log(username, password, port, dbName, host);
};

module.exports = { setConfig, configObject };
