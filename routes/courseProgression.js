const express = require("express");
const router = express.Router();
const Progress = require("../models/courseprogression");

// Course Progression
router.get("/:userId/:courseId", async (req, res) => {
  // get course progression based on userId and courseId
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    // Validate userId and courseId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    const userProgress = await Progress.findOne({ userId, courseId }).lean();

    if (userProgress) {
      res.status(200).json(userProgress);
    } else {
      res.status(404).json({
        error: "Progress not found for the specified user and course",
      });
    }
  } catch (error) {
    console.error("Error fetching course progression:", error);
    res.status(500).json({ error: "Internal server error", errMsg: error });
  }
});

router.post("/:userId", async (req, res) => {
  // create progress document for newly enrolled students
  try {
    const userId = req.params.userId;
    const courseId = req.body.courseId;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // Validate courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    // Check if user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if courseId exists
    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Enroll user in the course
    const userProgress = await Progress.findOneAndUpdate(
      { userId, courseId },
      { $setOnInsert: { userId, courseId, modulesProgress: [] } },
      { upsert: true, new: true }
    ).lean();

    res.status(200).json(userProgress);
  } catch (error) {
    console.error("Error enrolling in class:", error);
    res.status(500).json({ error: "Internal server error", errMsg: error });
  }
});

router.put("/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { moduleId, assignmentId, score } = req.body;
    // Validate userId and courseId
    if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
      return res.status(400).json({ error: "Invalid userId or courseId" });
    }
    // Validate moduleId
    if (!isValidObjectId(moduleId)) {
      return res.status(400).json({ error: "Invalid moduleId" });
    }
    // Find or create user progress
    let userProgress = await Progress.findOneAndUpdate(
      { userId, courseId },
      { $setOnInsert: { userId, courseId, modulesProgress: [] } },
      { upsert: true, new: true }
    );
    // Find or create module
    let module = userProgress.modulesProgress.find(
      (m) => m.moduleId === moduleId
    );
    if (!module) {
      module = { moduleId, assignmentProgress: [] };
      userProgress.modulesProgress.push(module);
    }
    // Find or create assignment within the module
    let assignment = module.assignmentProgress.find(
      (a) => a.assignmentId === assignmentId
    );
    if (!assignment) {
      assignment = {
        assignmentId,
        score,
        completedDate: new Date(),
        completed: true,
      };
      module.assignmentProgress.push(assignment);
    } else {
      assignment.score = score;
      assignment.completed = true;
      assignment.completedDate = new Date();
    }
    // Save updated user progress
    await userProgress.save();
    res.status(200).json({ message: "User progress updated successfully" });
  } catch (error) {
    console.error("Error updating user progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/progress/:userId/:courseId", async (req, res) => {
  // Validate userId and courseId
  if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    return res.status(400).json({ error: "Invalid userId or courseId" });
  }

  const { userId, courseId } = req.params;

  try {
    // Delete the course's progression for the specified user
    const deletedProgress = await Progress.deleteMany({ userId, courseId });
    console.log(`${deletedProgress.deletedCount} progress documents deleted for userId: ${userId} and courseId: ${courseId}`);
    res.status(200).json({ message: "Course progression deleted" }); // Respond with success message
  } catch (error) {
    console.error("Error deleting course progression:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

module.exports = router;
