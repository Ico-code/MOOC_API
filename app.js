const express = require("express");
const app = express();
const port = 3000;

// Routes
const coursesRouter = require('./routes/courses');
const courseProgressionRouter = require('./routes/courseProgression');
const usersRouter = require('./routes/users');
const modulesRouter = require('./routes/modules');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Check for connection errors
mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/courses', coursesRouter);
app.use('/courseProgression', courseProgressionRouter);
app.use('/users', usersRouter);
app.use('/modules', modulesRouter);

// Listening for request to the API
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
