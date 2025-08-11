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
const app = express();
const path = require("path");
const { body, validationResult } = require("express-validator");
const override = require("method-override");
const AppError = require("./Errorhandler.js");

//creating middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(override("_method"));

// form validation

let formValidation = [
  body("name").trim(),
  body("rollNo").isNumeric().withMessage("rollNo is numeric value").trim(),
  body("className")
    .isAlphanumeric()
    .withMessage("className is alphanumeric value"),
  body("section").trim(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("enter a valid email")
    .normalizeEmail(),
  body("phone").trim().isNumeric().withMessage("enter a number"),
];

// wrapAsync error handler

//root routs
app.get("/", async (req, res, next) => {
  try {
    let allList = await Student.find();
    res.render("index.ejs", { allList });
  } catch (error) {
    next(error);
  }
});

// student form show
app.get("/student/add", (req, res) => {
  try {
    res.render("addStudent.ejs");
    console.log("your form are saved");
  } catch (error) {
    console.log(error);
  }
});
// post route
app.post("/student/add", formValidation, async (req, res) => {
  let error = validationResult(req);
  if (error.isEmpty()) {
    let { name, rollNo, className, section, email, phone, createdAt } =
      req.body;
    let StudentSaved = await new Student({
      name,
      rollNo,
      className,
      section,
      email,
      phone,
      createdAt,
    });
    StudentSaved.save();
    res.send("your form are saved");
  } else {
    res.send(error.array()[0].msg);
  }
});
// edit route
app.get("/student/edit/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("edit.ejs", { student });
  } catch (error) {
    console.log(error);
  }
});
// update method
app.patch("/student/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        rollNo: req.body.rollNo,
        className: req.body.className,
        section: req.body.section,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

// destroy rout
app.delete("/student/delete/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedStudent = await Student.findByIdAndDelete(id);
    console.log("Deleted:", deletedStudent);
    res.redirect("/");
  } catch (err) {
    
    console.error("Error deleting student:", err);
    res.status(500).send("Failed to delete student");
  }
});

// creating schema
let studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// creating model

let Student = mongoose.model("Student", studentSchema);

// creating mongoose connection
main()
  .then((response) => {
    console.log("mongodb is connect");
  })
  .catch((error) => {
    console.log(error);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/studentDB");
}
// server creating
app.listen("3000", () => {
  console.log("server is starting on port no. 3000");
});

// 404 error routes

app.use((req, res, next) => {
  res.status(404).send("<h1>Error :404 page not found</h1>");
});

//error middleware
app.use((err, req, res, next) => {
  let { status = "500", message = "something went wrong " } = err;
  res.status(status).send(message);
});
