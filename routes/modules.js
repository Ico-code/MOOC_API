const express = require("express");
const router = express.Router();
const Module = require("../models/module.js");
const Progress = require("../models/courseprogression.js");
const Course = require("../models/course.js");

const mongoose = require("mongoose");

// Function to validate module data against the Mongoose schema
async function validateModuleData(moduleData) {
  if (!moduleData || typeof moduleData !== "object") {
    throw { error: `Invalid data for module` };
  }

  // Validate module data against Mongoose schema
  const validationError = await new Module(moduleData).validateSync();
  if (validationError) {
    throw { error: validationError.errors };
  }
}

// Modules
router.get("/:moduleId", async (req, res) => {
  try {
    const moduleId = req.params.moduleId;

    // Validate module ID
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ error: "Invalid module ID" });
    }

    // Find the module by its _id
    const foundModule = await Module.findById(moduleId).lean();

    if (!foundModule) {
      console.log("Module not found.");
      return res.status(404).json({ error: "Module not found" });
    }

    console.log("Found module:", foundModule);
    res.status(200).json(foundModule); // Respond with the found module
  } catch (err) {
    console.error("Error fetching module:", err);
    res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all modules
    const modules = await Module.find().lean();

    res.status(200).json(modules); // Respond with all modules
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ error: "Internal server error", errMsg: err }); // Return an error response
  }
});

router.post("/", async (req, res) => {
  try {
    const successfulModules = [];

    const moduleData = req.body;
    for (const item of moduleData) {
      const { title, totalScore, duration, order, material, courseId } = item;
      // Validate required fields
      if (
        !title ||
        !courseId ||
        !material ||
        !Array.isArray(material) ||
        material.length === 0
      ) {
        return res
          .status(400)
          .json({ error: "Title, courseId, and material array are required" });
      }
      // Check if the course exists
      const courseExists = await Course.exists({ _id: courseId });
      if (!courseExists) {
        return res.status(404).json({ error: "Course not found", successfulModules: successfulModules });
      }
      // Validate material array
      for (let index = 0; index < material.length; index++) {
        const content = material[index];
        if (!content.content_type || !content.content) {
          return res
            .status(400)
            .json({ error: `Invalid material content at index ${index}`, successfulModules: successfulModules });
        }
        if (typeof content.content_type !== "string") {
          return res.status(400).json({
            error: `Invalid data type for material content_type at index ${index}`, successfulModules: successfulModules,
          });
        }
        if (content.score && typeof content.score !== "number") {
          return res.status(400).json({
            error: `Invalid data type for material score at index ${index}`, successfulModules: successfulModules,
          });
        }
      }
      // Create a new module instance
      const newModule = new Module({
        title,
        totalScore,
        duration,
        order,
        material,
        courseId,
      });
      // Save the new module to the database
      const savedModule = await newModule.save();
      successfulModules.push(savedModule);
    }
    res.status(201).json({ success: "Modules created successfully", modules: successfulModules });
  } catch (error) {
    console.error("Error creating module:", error);
    res.status(500).json({ error: "Internal server error", successfulModules: successfulModules });
  }
});
router.put("/content/:moduleId", async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const { material } = req.body;
    // Validate material data
    if (!material || !Array.isArray(material) || material.length === 0) {
      return res
        .status(400)
        .json({ error: "Material array is required and must not be empty", successfulModules: successfulModules });
    }
    let validationError = null;
    // Validate each material item
    material.forEach((content, index) => {
      if (!content.content_type || !content.content) {
        validationError = {
          error: `Invalid material content at index ${index}`, successfulModules: successfulModules,
        };
      }
      if (typeof content.content_type !== "string") {
        validationError = {
          error: `Invalid data types for material content at index ${index}`, successfulModules: successfulModules,
        };
      }
    });
    if (validationError) {
      return res.status(400).json(validationError);
    }
    // Update the module's contents in the database
    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { material },
      { new: true }
    );
    if (!updatedModule) {
      console.log("Module not found.");
      return res.status(404).json({ error: "Module not found", successfulModules: successfulModules });
    }
    console.log("Module contents updated:", updatedModule);
    res.status(200).json(updatedModule);
  } catch (error) {
    console.error("Error updating module contents:", error);
    res.status(500).json({ error: "Internal server error", successfulModules: successfulModules }); // Return an error response
  }
});

router.delete("/:moduleId", async (req, res) => {
  const moduleId = req.params.moduleId;

  // Validate moduleId
  if (!mongoose.Types.ObjectId.isValid(moduleId)) {
    return res.status(400).json({ error: "Invalid moduleId" });
  }

  try {
    // Delete the module
    const deletedModule = await Module.findByIdAndDelete(moduleId);

    if (!deletedModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Delete the module from all progress documents
    const deletedProgress = await Progress.updateMany(
      { "modulesProgress.moduleId": moduleId },
      { $pull: { modulesProgress: { moduleId } } }
    );

    console.log(
      `Deleted module from ${deletedProgress.nModified} progress documents`
    );

    res.status(200).json({ message: "Module deleted" }); // Respond with success message
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

module.exports = router;
