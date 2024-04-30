const express = require("express");
const router = express.Router();
const Course = require("../models/course.js");
const User = require("../models/user.js");
const Module = require("../models/module.js");
const Progress = require("../models/courseprogression.js");

const mongoose = require("mongoose");

// Courses
router.get("/", (req, res) => {
  // Fetch All Courses that aren't archived
  Course.find({ isArchived: false })
    .then((courses) => {
      res.status(200).json(courses); // Return the courses as JSON response
    })
    .catch((err) => {
      console.error("Error finding courses:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.get("/archived", (req, res) => {
  // Fetch All Archived Courses
  Course.find({ isArchived: true })
    .then((archivedCourses) => {
      res.status(200).json(archivedCourses); // Return the archived courses as JSON response
    })
    .catch((err) => {
      console.error("Error finding archived courses:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.get("/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  // Validate courseId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid courseId" });
  }
  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        // If no course is found with the provided ID, return a 404 Not Found response
        return res.status(404).json({ error: "Course not found" });
      }
      // If a course is found, return it as a JSON response with a status code of 200
      res.status(200).json(course);
    })
    .catch((err) => {
      console.error("Error finding course:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.get("/user/:username", async (req, res) => {
  // get all classes user is participating in
  try {
    const username = req.params.username;

    // Use the username to find courses where the user is a participant
    const courses = await Course.find({ participants: username });
    
    // Return the courses as JSON response
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses for user:", error);
    res.status(500).json({ error: "Internal server error", errMsg: error }); // Return an error response
  }
});

router.post("/", async (req, res) => {
  // Extract data from request body
  const {
    title,
    courseDetails: { description, duration, prerequisites },
    instructors,
    participants,
    isArchived,
  } = req.body;

  // console.log(
  //   `Title: ${title}\nDescription: ${description}\nDuration: ${duration}\nPrerequisites: ${prerequisites}\nInstructors: ${instructors}\nParticipants: ${participants}`
  // );

  try {
    // Data validation
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a non-empty string" });
    }

    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ error: "Description is required and must be a string" });
    }

    if (!duration || typeof duration !== "string") {
      return res
        .status(400)
        .json({ error: "Duration is required and must be a string" });
    }

    if (!prerequisites || typeof prerequisites !== "string") {
      return res
        .status(400)
        .json({ error: "Prerequisites is required and must be a string" });
    }

    if (!Array.isArray(instructors) || instructors.length === 0) {
      return res.status(400).json({
        error: "Instructors is required and must be a non-empty array",
      });
    }

    if (!Array.isArray(participants)) {
      return res.status(400).json({ error: "Participants must be an array" });
    }

    // Check if instructors and participants exist and have the appropriate roles
    let [validInstructors, validParticipants] = await Promise.all([
      User.find({ username: { $in: instructors }, role: "teacher" }).lean(),
      User.find({ username: { $in: participants } }).lean(),
    ]);

    validInstructors = validInstructors.map(instructor => instructor.username);
    validParticipants = validParticipants.map(participant => participant.username);

    console.log("Valid Instructors:", validInstructors);
    console.log("Valid Participants:", validParticipants);

    // Check if all instructors were found and have the role 'teacher'
    if (validInstructors.length !== instructors.length) {
      return res
        .status(400)
        .json({ error: "One or more instructors not found or not teachers" });
    }
    // Create a new course instance
    const newCourse = new Course({
      title,
      courseDetails: {
        description,
        createDate: new Date(),
        lastUpdated: new Date(),
        duration,
        prerequisites,
      },
      instructors: validInstructors,
      participants: validParticipants,
      isArchived: isArchived,
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();
    console.log("New course created:", savedCourse);
    res.status(201).json(savedCourse); // Return the created course with a status code of 201 (Created)
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ error: "Internal server error", errMsg: error.message }); // Return an error response
  }
});

router.put("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Check if courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }
    // Extract updated fields from the request body
    const {
      title,
      description,
      duration,
      prerequisites,
      instructors,
      isArchived,
    } = req.body;
    // Construct the update object with the provided fields
    const updateFields = {};
    if (title) updateFields["title"] = title;
    if (description) updateFields["courseDetails.description"] = description;
    if (duration) updateFields["courseDetails.duration"] = duration;
    if (prerequisites)
      updateFields["courseDetails.prerequisites"] = prerequisites;
    if (instructors) updateFields["instructors"] = instructors;
    if (isArchived !== undefined) updateFields["isArchived"] = isArchived;
    // Update the course in the database
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("Updated course:", updatedCourse);
    res.status(200).json(updatedCourse); // Return the updated course
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(500)
      .json({ error: "Internal server error", errMsg: error.message }); // Return an error response
  }
});

router.put("/:courseId/archive", (req, res) => {
  // Extract courseId from request parameters
  const courseId = req.params.courseId;
  // Validate courseId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid courseId" });
  }
  // Archive course
  Course.findByIdAndUpdate(courseId, { isArchived: true })
    .then((updatedCourse) => {
      if (!updatedCourse) {
        console.log("Course not found.");
        res.status(404).json({ error: "Course not found" });
        return;
      }
      console.log("Course archived:", updatedCourse);
      res.status(200).json(updatedCourse); // Respond with the updated course
    })
    .catch((err) => {
      console.error("Error archiving course:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});


router.put("/:courseId/unarchive", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Check if courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }
    // Construct the update object to set isArchived to false
    const updateFields = {
      isArchived: false
    };
    // Update the course in the database
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("Updated course:", updatedCourse);
    res.status(200).json(updatedCourse); // Return the updated course
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(500)
      .json({ error: "Internal server error", errMsg: error.message }); // Return an error response
  }
});

router.delete("/:courseId/participants/:username", async (req, res) => {
  try {
    const { courseId, username } = req.params;

    // Check if courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove participant from course
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $pull: { participants: username },
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("Participant removed from course:", updatedCourse);
    res.status(200).json(updatedCourse); // Respond with the updated course
  } catch (err) {
    console.error("Error removing participant from course:", err);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

router.delete("/:courseId", async (req, res) => {
  // Validate courseId
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    return res.status(400).json({ error: "Invalid courseId" });
  }
  const courseId = req.params.courseId;
  try {
    // Delete all modules associated with the course
    await Module.deleteMany({ courseId });
    // Delete the course itself
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      console.log("Course not found.");
      return res.status(404).json({ error: "Course not found" });
    }
    // Delete related progress documents
    await Progress.deleteMany({ courseId });

    console.log("Course and associated modules deleted:", deletedCourse);
    res.status(200).json(deletedCourse); // Respond with the deleted course
  } catch (error) {
    console.error("Error deleting course and modules:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

module.exports = router;
