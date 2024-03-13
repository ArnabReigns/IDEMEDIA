const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Authentication/index");
const PostRouter = require("./routes/Posts/index");
const chalk = require("chalk");
const auth = require("./middlewares/auth");
const required = require("./utils/required");
const Posts = require("./models/postModel");
const User = require("./models/UserModel");
dotenv.config();
require("./db");

// cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://camelcase.vercel.app"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// cookie parser
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", [auth], (req, res) => {
  return res.send("camelCase API at " + req.headers.host);
});

// authentication routes
app.use("/api/auth", AuthRouter);

// post routes
app.use("/api/posts", PostRouter);

// listener
app.listen(process.env.PORT || 4000, () => {
  console.clear();
  console.log(chalk.yellow.bold(`Server started on PORT: ${process.env.PORT}`));
});
