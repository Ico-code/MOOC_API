const mongoose = require('mongoose');

const courseProgressionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user document (foreign key)
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Reference to the course document (foreign key)
  modulesProgress: [
    {
      moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
      }, // Reference to the module document (foreign key)
      assignmentProgress: [
        {
          assignmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
          }, // Reference to the assignment document within the module (optional)
          completedDate: { type: Date },
          score: { type: Number, default: 0 }, // Score achieved in the assignment
          completed: { type: Boolean, default: false }, // True if the assignment is completed, False otherwise
        },
      ],
    },
  ],
});

const CourseProgrssion = mongoose.model(
  "CourseProgrssion",
  courseProgressionSchema
);

module.exports = CourseProgrssion;