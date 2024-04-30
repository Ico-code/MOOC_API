const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the module
    totalScore: { type: Number }, // total amount of point earnable through this module
    duration: { type: String }, // duration for the course modules
    order: { type: Number }, // order for the course modules
    material: [
      {
        content_type: { type: String, required: true }, // Type of content
        score:{ type: Number }, // Maximum Score for the assignment
        content: { type: mongoose.Schema.Types.Mixed, required: true } // Mixed type for flexibility
      }
    ],
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true } // Reference to the course it is part of
  });

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;