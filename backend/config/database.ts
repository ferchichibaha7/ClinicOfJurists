import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript'
import { User } from "../src/models/User";
import { Role } from "../src/models/Role";
import { Category } from "../src/models/Category";
import { Question } from "../src/models/Question";
import { Quiz } from "../src/models/Quiz";
import { Subcategory } from "../src/models/Subcategory";
import { UserQuizzes } from "../src/models/UserQuizzes";
import { Transaction } from "../src/models/Transaction";
import { Option } from "../src/models/Option"; // You might need this too
import { UserAnswers } from "../src/models/UserAnswers";

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
  models: [User, Role, Quiz, Question, Option, UserQuizzes, Category, Subcategory, Transaction,UserAnswers], // Include all models
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
