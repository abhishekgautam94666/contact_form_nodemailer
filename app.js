const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const { log } = require("console");

const app = express();
app.use(express.static("css"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const comm = req.body.message;
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhishekgautam94666@gmail.com",
      pass: "trahydgxitzslsya",
    },
  });
  let mailOption = {
    from: "abhishekgautam94666@gmail.com",
    to: email,
    cc: "abhishekgautam94666@gmail.com",
    subject: "Thank for giving feedback",
    html:
      "Name:" +
      name +
      "<br> Email:" +
      email +
      "<br> Phone No:" +
      number +
      "<br> Message:" +
      comm,
  };
  transport.sendMail(mailOption, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
      console.log("email sucess" + info.response);
    }
  });
});

app.listen(3000, function () {
  console.log("server started at 3000");
});
