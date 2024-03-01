const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arnabchatterjee912@gmail.com",
    pass: "mlod ypwl oqgx mign",
  },
});

module.exports = transporter;
