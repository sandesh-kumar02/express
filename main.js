const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const override = require("method-override");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
const AppError = require('./errorhandling.js');
const app = express();
const port = 3000;
const router = require("./routes/user.js");
const models = require('./models/user.models.js');

// middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(override("_method"));

// formValidation

let formValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("email is require").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

app.use(
  session({
    secret: "yourSecretKey", // koi bhi secret string
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // session valid for 1 day
    },
  })
);

// middleware

app.use('/', router);

// connecting  database
main()
  .then((response) => {
    console.log("database are connect");
  })
  .catch((error) => {
    console.log("database connecting error", error);
  });

// connection with database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/userAuthDB");
}

// server connection creating
app.listen(port, () => {
  console.log(`server are connect with port no. ${port}`);
});

/// error handling middleware
app.use((req, res, next) => {
  res.status(404).send("<h1>Error : 404 page not found</h1>");
});
