const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const fix = require("./fix");
const chalk = require("chalk");

const AuthRouter = require("./routes/Authentication/index");
const PostRouter = require("./routes/Posts/index");
const ProfileRouter = require("./routes/Profile");
const NotificationRouter = require("./routes/Notifications");

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

// cookie parser
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", [auth], (req, res) => {
  return res.send("camelCase API at " + req.headers.host);
});

app.get("/api/fix", fix);
app.use("/api/auth", AuthRouter);

app.use(auth);
app.use("/api/posts", PostRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/notifications", NotificationRouter);

// listener
server.listen(process.env.PORT || 4000, () => {
  console.clear();
  console.log(chalk.yellow.bold(`Server started on PORT: ${process.env.PORT}`));
});

// websocket

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("setup", ({ id }) => {
    socket.join(id); // join the room with user _id
    socket.emit("connected", "you are connected to a private room : " + id);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
