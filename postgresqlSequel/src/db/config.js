import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import { UserModel } from "../model/user.js";

dotenv.config()

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const connection = async () => {
  console.log({database,username,password})
  const sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "postgres",
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    UserModel()
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
