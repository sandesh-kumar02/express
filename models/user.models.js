// creating schema
let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // no duplicate email
    lowercase: true, // convert to lowercase
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6, // at least 6 chars
  },
  profilePic: {
    type: String,
    default: "/image/login.png", // ✅ Default image path
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// creating model
const User = mongoose.model("User", userSchema);

module.exports = User;