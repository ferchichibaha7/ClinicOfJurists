import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript'
import { User } from "../src/models/User";
import { Role } from "../src/models/Role";
dotenv.config();
const pg_db = process.env.PG_DB;
const pg_user = process.env.PG_USER;
const pg_pass = process.env.PG_PASS;

const sequelize = new Sequelize({
  database: pg_db,
  dialect: 'postgres',
  username: pg_user,
  password: pg_pass,
  logging:false,
  models: [User,Role], // Include all models
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const connectAuthenticate = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((err) => {
      console.log("Error db");
    });
};

export { sequelize, connectAuthenticate };
