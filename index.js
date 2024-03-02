const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Authentication");
const chalk = require("chalk");
dotenv.config();
require("./db");

// cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://coderdost-riju.vercel.app"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// cookie parser
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  return res.send("camelCase API");
});

// authentication routes
app.use("/api/auth", AuthRouter);

// listener
app.listen(process.env.PORT || 4000, () => {
  console.log(chalk.yellow.bold(`Server started on PORT: ${process.env.PORT}`));
});
