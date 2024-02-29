const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var cors = require("cors");
dotenv.config();
require("./db");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("HELLO WORLD!");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arnabchatterjee912@gmail.com",
    pass: "mlod ypwl oqgx mign", 
  },
});

app.get("/accounts/activation/:id", (req, res) => {
  const token = req.params.id;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Error Occured");
    } else {
      const email = decoded.email;
      console.log(email);

      return User.findOneAndUpdate(
        { email: email },
        {
          isActive: true,
        },
        {
          new: true,
        }
      )
        .then((r) => {
          console.log(r);
          return res.redirect("http://localhost:5173/");
        })
        .catch((e) => res.send("Error Occured"));
    }
  });
});

app.post("/login/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user)
    return res.status(400).json({
      msg: "Invalid Credentials",
    });

  const matched = await bcrypt.compare(password, user.password);

  if (matched) {
    return res.json({
      msg: "log in successful",
      user: user,
    });
  } else {
    return res.status(400).json({
      msg: "Invalid Credentials",
    });
  }
});

app.post("/register/", async (req, res) => {
  const data = req.body;

  if (!data.username)
    return res.status(400).json({
      error: true,
      msg: "username is required",
    });
  if (!data.email)
    return res.status(400).json({
      error: true,
      msg: "email is required",
    });

  const userExist = await User.findOne({ username: data.username });

  if (userExist)
    return res.json({ error: true, msg: "username already exists" });
  else {
    const token = jwt.sign({ email: data.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    transporter
      .sendMail({
        from: "arnabchatterjee912@gmail.com", // Sender address
        to: data.email, // List of recipients
        subject: "Email Verification Link", // Subject line
        text: `Click this link to activate your accout: http://192.168.29.56:3000/accounts/activation/${token}`, // Plain text body
      })
      .then((r) => console.log("mail sent"))
      .catch((e) => console.log(e));

    // return res.json({
    //   msg: "verify email",
    // });

    return new User({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password,
    })
      .save()
      .then((user) =>
        res.send({
          msg: "user registered successfully",
          data: {
            username: user?.username,
            email: user?.email,
          },
        })
      )
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ err: true, msg: "some internal error occured" });
      });
  }
});

app.get('/me', async (req,res)=> {
  
})

app.listen(process.env.PORT || 4000, () =>
  console.log(`server started on PORT: ${process.env.PORT}`)
);
