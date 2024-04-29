const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // id of store item
  title: { type: String, required: true, unique: true }, // title of the course
  courseDetails: {
    description: { type: String }, // description of the course's contents
    lastUpdated: { type: Date, default: Date.now }, // when was the course last updated
    createdDate: { type: Date, default: Date.now }, // when was the course created
    duration: { type: String }, // how long should the course take to complete as a whole
    prerequisites: { type: String }, // details about the prerequisites for the course
  },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // list of instructors for the course
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // a list of usernames of the students who are taking this course
  isArchived: { type: Boolean, default: false }, // is the course archived, or is it still in active use
});

const Course = mongoose.model("Course", courseSchema);
