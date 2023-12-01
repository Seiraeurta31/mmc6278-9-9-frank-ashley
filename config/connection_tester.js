const mysql = require("mysql2");

const config = process.env.JAWSDB_URL || {
  connectionLimit: 10,
  host: "lightning.",
  user: "ashley",
  password: "Rainbow0331!",
  database: process.env.npm_package_config_DB_NAME,
};
const db = mysql.createPool(config);

module.exports = db.promise();
