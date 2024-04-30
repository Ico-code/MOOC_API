const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Course = require("../models/course.js");

const mongoose = require("mongoose");

//Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  // Find the user document by username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Compare the provided password with the password stored in the database
      if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      // Passwords match, user is authenticated
      res.status(200).json({ message: "Authentication successful", user });
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error", errMsg: err });
    });
});

// Users
router.get("/course/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const participantUsernames = course.participants;

    const users = await User.find({ username: { $in: participantUsernames } });

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users for course:", err);
    res.status(500).json({ error: "Internal server error", errMsg: err.message });
  }
});

router.get("/:username", (req, res) => {
  const username = req.params.username;

  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Username is required" });
  }
  // Find the user document by username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err });
    });
});

router.get("/", (req, res) => {
  // Find all user documents
  User.find()
    .then((users) => {
      res.status(200).json(users); // Respond with the array of users
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error", errMsg: error });
    });
});

router.post("/", (req, res) => {
  // console.log(req.body)
  let { role, email, username, password } = req.body; // Extract user data from request body

  // Check if email, username, and password are provided and not empty
  if (
    !email ||
    !username ||
    !password ||
    email.trim() === "" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Email, username, and password are required" });
  }

  // Set default role to "student" if not provided
  if (!role) {
    role = "student";
  }
  // Create a new user instance
  const newUser = new User({
    role,
    email,
    username,
    password,
  });
  // Save the new user to the database
  newUser
    .save()
    .then((savedUser) => {
      console.log("New user created:", savedUser);
      res.status(201).json(savedUser); // Respond with the created user
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.put("/:username", (req, res) => {
  // Update user data
  const username = req.params.username;
  const updatedUserData = req.body; // Extract updated user data from request body

  // Check if username is provided and not empty
  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Username is required" });
  }

  // Validate updated user data
  if (updatedUserData.email && typeof updatedUserData.email !== "string") {
    return res.status(400).json({ error: "Email must be a string" });
  }

  if (
    updatedUserData.role &&
    !["student", "teacher"].includes(updatedUserData.role)
  ) {
    return res
      .status(400)
      .json({ error: "Role must be either 'student' or 'teacher'" });
  }

  if (
    updatedUserData.password &&
    typeof updatedUserData.password !== "string"
  ) {
    return res.status(400).json({ error: "Password must be a string" });
  }

  // Find the user document by username and update it
  User.findOneAndUpdate({ username }, updatedUserData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("User updated:", updatedUser);
      res.status(200).json(updatedUser); // Respond with the updated user
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.delete("/:userId", async (req, res) => {
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  const userId = req.params.userId;

  try {
    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User deleted:", deletedUser);
    res.status(200).json(deletedUser); // Respond with the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

module.exports = router;
