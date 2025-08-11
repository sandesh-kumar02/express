const express = require("express");
const router = express.Router();
// signup route
router.get("/signup", (req, res) => {
  res.render("signUp.ejs");
});

router.post("/signup", formValidation, async (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    try {
      // 1️⃣ Form data destructuring
      let { username, email, password } = req.body;
      // 2️⃣ Password hashing using bcrypt
      let hashPassword = await bcrypt.hash(password, 10);
      // 3️⃣ New user object create karo (Model ka use karo)
      let newUser = await new User({
        username,
        email,
        password: hashPassword,
      });
      // 4️⃣ MongoDB me save karo
      newUser.save();
      res.render("login.ejs");
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  } else {
    res.status(500).send(error.array()[0].msg);
  }
});

// login route
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// post method
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    // 🔍 Step 1: User find karo DB se
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.send("❌ Email not found. Please signup.");
    }
    // 🔐 Step 2: Password compare karo
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.send("❌ Incorrect password.");
    }
    // ✅ Step 3: Session set karo
    req.session.userId = foundUser._id;
    // 🎯 Step 4: Redirect after login
    res.redirect("/data"); // ya koi bhi protected page
  } catch (error) {
    console.log(error);
    res.status(500).send("❌ Internal server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Logout failed");
    }
    res.redirect("/login");
  });
});

// protected middleware for your data

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

router.get("/data", requireLogin, (req, res) => {
  res.render("data.ejs");
});

// data show on page
router.get("/user", async (req, res) => {
  let userDetails = await User.find();
  res.render("show.ejs", { userDetails });
});

// delete route

router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.send("user deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("user not found");
  }
});

module.exports = router;
