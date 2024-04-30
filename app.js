const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();

// Routes
const coursesRouter = require('./routes/courses');
const courseProgressionRouter = require('./routes/courseProgression');
const usersRouter = require('./routes/users');
const modulesRouter = require('./routes/modules');

const mongoose = require('mongoose');
const uri = process.env.connectionKey;

mongoose.connect(uri);

// Check connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Check for connection errors
mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/courses', coursesRouter);
app.use('/courseProgression', courseProgressionRouter);
app.use('/users', usersRouter);
app.use('/modules', modulesRouter);

app.get("/dbconnection", async (req, res) => {
  try {
    // Check if mongoose has a connection
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      res.status(200).json({ message: "MongoDB connected" });
    } else {
      res.status(500).json({ error: "MongoDB not connected" });
    }
  } catch (error) {
    console.error("Error checking database connection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Listening for request to the API
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
