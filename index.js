const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Authentication/index");
const PostRouter = require("./routes/Posts/index");
const chalk = require("chalk");
const auth = require("./middlewares/auth");
const required = require("./utils/required");
const fix = require("./fix");
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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

// cookie parser
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", [auth], (req, res) => {
  io.emit("hi", { activated: true });
  return res.send("camelCase API at " + req.headers.host);
});

app.get("/api/fix", fix);

// authentication routes
app.use("/api/auth", AuthRouter);

// get current user
app.use(auth);

// post routes
app.use("/api/posts", PostRouter);

// listener
server.listen(process.env.PORT || 4000, () => {
  console.clear();
  console.log(chalk.yellow.bold(`Server started on PORT: ${process.env.PORT}`));
});

