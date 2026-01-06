import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST, // Use IPv4 explicitly
    dialect: "mysql",
    port: process.env.MYSQL_PORT || 8001,
    logging: false, // disable or customize logging
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 10000,
      // enableKeepAlive: true // optional
    },
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection to MySQL has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

export default sequelize;
