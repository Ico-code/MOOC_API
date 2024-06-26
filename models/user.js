const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ['student', 'teacher'], required: true }, // information on whether the user is a student or a teacher
    email: { type: String, required: true }, // the users email so that they can be contacted, if need be
    username: { type: String, required: true, unique: true }, // accounts username
    password: { type: String, required: true } // accounts password
  });

const User = mongoose.model("User", userSchema);

module.exports = User;