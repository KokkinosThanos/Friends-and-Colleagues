const { Sequelize } = require("sequelize");
const mysqlDatabase = require("../DB_details/MysqlConnect");

const MysqlDetails = { ...mysqlDatabase[0] };

const sequelize = new Sequelize(
  MysqlDetails.database,
  MysqlDetails.username,
  MysqlDetails.password,
  {
    host: MysqlDetails.host,
    dialect: MysqlDetails.dialect,
  }
);

let db_status;
const db_error = "There was an error conencting to the database...";
const db_success = "Succeed connection to MYSQL ";

if (sequelize.ConnectionError) {
  db_status = db_error;
  console.log(db_status);
} else {
  db_status = db_success;
  console.log(db_status);
}

module.exports = sequelize;
