const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const User = require("./models/user");

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

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  // Use the userId to find courses where the user is a participant
  Course.find({ participants: userId })
    .then((courses) => {
      console.log("Courses for user:", courses);
      res.status(200).json(courses); // Return the courses as JSON response
    })
    .catch((err) => {
      console.error("Error fetching courses for user:", err);
      res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
    });
});

router.post("/", async (req, res) => {
  // Extract data from request body
  const {
    title,
    description,
    duration,
    prerequisites,
    instructors,
    participants,
  } = req.body;

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
    const [validInstructors, validParticipants] = await Promise.all([
      User.find({ username: { $in: instructors }, role: "teacher" }).lean(),
      User.find({ username: { $in: participants } }).lean(),
    ]);

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
      participants: instructors,
      isArchived: false,
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

// old route for posting data
// router.post("/", async (req, res) => {
//   // Extract data from request body
//   const {
//     title,
//     description,
//     duration,
//     prerequisites,
//     instructors,
//     participants,
//   } = req.body;
//   try {
//     // Check if instructors and participants exist and have the appropriate roles
//     const [validInstructors, validParticipants] = await Promise.all([
//       User.find({ username: { $in: instructors }, role: "teacher" }).lean(),
//       User.find({ username: { $in: participants } }).lean(),
//     ]);
//     // Check if all instructors were found and have the role 'teacher'
//     if (validInstructors.length !== instructors.length) {
//       return res
//         .status(400)
//         .json({ error: "One or more instructors not found or not teachers" });
//     }
//     // Convert usernames to ObjectIDs
//     const instructorIds = validInstructors.map((instructor) => instructor._id);
//     const participantIds = validParticipants.map(
//       (participant) => participant._id
//     );
//     // Create a new course instance
//     const newCourse = new Course({
//       title,
//       courseDetails: {
//         description,
//         duration,
//         prerequisites,
//       },
//       instructors: instructorIds,
//       participants: participantIds,
//       isArchived: false,
//     });
//     // Save the new course to the database
//     const savedCourse = await newCourse.save();
//     console.log("New course created:", savedCourse);
//     res.status(201).json(savedCourse); // Return the created course with a status code of 201 (Created)
//   } catch (error) {
//     console.error("Error creating course:", error);
//     res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
//   }
// });

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
      participants,
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
    if (participants) updateFields["participants"] = participants;
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

router.delete("/:courseId/participants/:userId", async (req, res) => {
  //delete user from course
  try {
    // Extract courseId and userId from request parameters using object destructuring
    const { courseId, userId } = req.params;
    // Validate courseId and userId
    if (
      !mongoose.Types.ObjectId.isValid(courseId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid courseId or userId" });
    }
    // Remove participant from course
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $pull: { participants: userId },
    });
    if (!updatedCourse) {
      console.log("Course not found.");
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
