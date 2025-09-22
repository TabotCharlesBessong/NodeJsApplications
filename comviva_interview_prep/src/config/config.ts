import { Dialect, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: Options = {
  username: (process.env.DATABASE_USER as string) || "inter_prep",
  password: (process.env.DATABASE_PASS as string) || "Charles#123",
  database: (process.env.DATABASE_NAME as string) || "postgres",
  host: (process.env.DATABASE_HOST as string) || "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
};

export default dbConfig;
