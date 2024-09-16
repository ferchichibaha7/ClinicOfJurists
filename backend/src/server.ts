import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { sequelize, connectAuthenticate } from "../config/database";
import user from "./routes/api/user";
import auth from "./routes/api/auth";
import quiz from "./routes/api/quiz";
import Question from "./routes/api/Question";
import Option from "./routes/api/Option";
import UserQuizzes from "./routes/api/UserQuizzes";
import transaction from "./routes/api/transaction";
import category from "./routes/api/category";
import subcategory from "./routes/api/subcategory";
import UserAnswers from "./routes/api/UserAnswers";

const app = express();

// Connect to DB
connectAuthenticate();
sequelize.sync({logging:false}).then(async res=>{
  console.log("sync done");
});


// CORS configuration to allow requests from localhost:8100
const corsOptions = {
  origin: 'http://localhost:8100', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());


//routes
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/quiz", quiz);
app.use("/api/question", Question);
app.use("/api/option", Option);
app.use("/api/user-quizzes",UserQuizzes );
app.use("/api/transaction", transaction);
app.use("/api/category", category);
app.use("/api/subcategory", subcategory);
app.use("/api/user-answers", UserAnswers);



const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
