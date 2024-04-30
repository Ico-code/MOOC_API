const express = require("express");
const router = express.Router();
const Progress = require("../models/courseprogression.js");
const User = require("../models/user.js");
const Course = require("../models/course.js");
const Module = require("../models/module.js");

const mongoose = require("mongoose");

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

router.get("/", async (req, res) => {
  try {
    const allCourseProgress = await Progress.find().lean();
    res.status(200).json(allCourseProgress);
  } catch (error) {
    console.error("Error fetching all course progress:", error);
    res.status(500).json({ error: "Internal server error", errMsg: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    // Validate courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }
    // Check if user exists and fetch username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = user.username;
    console.log(username);
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
    // Update participants array in the course document with username
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { participants: username } },
      { new: true }
    );
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
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res.status(400).json({ error: "Invalid userId or courseId" });
    }

    // Validate moduleId
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ error: "Invalid moduleId" });
    }

    // Fetch the module document
    const testModule = await Module.findById(moduleId);

    // Check if the module exists and if its courseId matches the one provided
    if (!testModule || testModule.courseId.toString() !== courseId) {
      return res.status(400).json({
        error: "Module not found or is not part of the provided courseId",
      });
    }

    // Find or create user progress
    let userProgress = await Progress.findOneAndUpdate(
      { userId, courseId },
      { $setOnInsert: { userId, courseId, modulesProgress: [] } },
      { upsert: true, new: true }
    );

    // Find or create module
    let moduleIndex = userProgress.modulesProgress.findIndex((m) =>
      m.moduleId.equals(moduleId)
    );

    if (moduleIndex === -1) {
      // If module doesn't exist, create it
      userProgress.modulesProgress.push({
        moduleId,
        assignmentProgress: [
          {
            assignmentId,
            score,
            completedDate: new Date(),
            completed: true,
          },
        ],
      });
    } else {
      // If module exists, find or create assignment
      let assignmentIndex = userProgress.modulesProgress[
        moduleIndex
      ].assignmentProgress.findIndex((a) =>
        a.assignmentId.equals(assignmentId)
      );

      if (assignmentIndex === -1) {
        // If assignment doesn't exist, create it
        userProgress.modulesProgress[moduleIndex].assignmentProgress.push({
          assignmentId,
          score,
          completedDate: new Date(),
          completed: true,
        });
      } else {
        // If assignment exists, update it
        userProgress.modulesProgress[moduleIndex].assignmentProgress[
          assignmentIndex
        ].score = score;
        userProgress.modulesProgress[moduleIndex].assignmentProgress[
          assignmentIndex
        ].completed = true;
        userProgress.modulesProgress[moduleIndex].assignmentProgress[
          assignmentIndex
        ].completedDate = new Date();
      }
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
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) ||
    !mongoose.Types.ObjectId.isValid(req.params.courseId)
  ) {
    return res.status(400).json({ error: "Invalid userId or courseId" });
  }

  const { userId, courseId } = req.params;

  try {
    // Delete the course's progression for the specified user
    const deletedProgress = await Progress.deleteMany({ userId, courseId });
    console.log(
      `${deletedProgress.deletedCount} progress documents deleted for userId: ${userId} and courseId: ${courseId}`
    );
    res.status(200).json({ message: "Course progression deleted" }); // Respond with success message
  } catch (error) {
    console.error("Error deleting course progression:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

module.exports = router;
