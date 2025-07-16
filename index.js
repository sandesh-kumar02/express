const express = require("express");
const { body, validationResult } = require("express-validator");
const path = require("path");
const app = express();

// setting up the middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// form-validation
const formValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is not empty")
    .isAlpha()
    .withMessage("only alpha character is required"),
  body("email").isEmail().withMessage("enter a valid email").toLowerCase(),
  body("password")
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage("password must be between 5 and 10 characters long"),
];

// creating router
app.get("/form", (req, res) => {
  res.render("form.ejs", { error: 0 });
});

app.post("/show", formValidator, (req, res) => {
  let { username, email, password } = req.body;
  const error = validationResult(req);
  if (error.isEmpty()) {
    const userDetails = `username : ${username}, userEmail : ${email}, and password ${password}`;
    res.send(userDetails);
  } else {
    res.render("form.ejs", { error: error.array() });
  }
});

// 404 page not found middleware
app.use((req, res) => {
  res.status(404).send("<h1>Error: 404 page not found</h1>");
});

app.listen("3000", () => {
  console.log("server is starting on port no. 3000");
});
