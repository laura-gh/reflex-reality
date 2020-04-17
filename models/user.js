const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: "Je nutné zadať meno.",
    trim: true,
    max: 30
  },
  last_name: {
    type: String,
    trim: true,
    max: 30
  },
  email: {
    type: String,
    required: "Je nutné zadať e-mailovú adresu.",
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: "Je nutné zadať heslo.",
    bcrypt: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);