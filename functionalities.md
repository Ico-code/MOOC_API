
# Courses
## Get
// Fetch All Courses
- GET /courses
// Fetch specific Course
- GET /courses/:courseId
// Fetch courses for specific user
- GET /courses/:userId
## Post
// Allows a teacher to create a new course
- POST /courses
## Update
// allows for a courses information to be updated
- PUT /courses/:courseId
// archive courses
- PUT /courses/:courseId/archive

### Deleting a User
// has to update both users collection, as well as the course.participants[].

### Enroll in class
// Has to update courses.participants[] and create a new document in "course progression" collection

### create module
// has to update course.module infromation and has to add a document to modules collection

### Deleting a Module
// has to delete document from modules collection and has to update course.modules, as well as "course progression" collection

## Delete
### Deleting a course
// has to delete document from modules collection and has to delete document from course collection, as well as deleting a document from  "course progression" collection.
// remove course participant
- DELETE /courses/:courseId/participants/:userId

# Course Progression
## Get
// Fetch Course Progression for a specific user
- GET /CourseProgression/:userId
## Post
### Enroll in class
// Has to update courses.participants[] and create a new document in "course progression" collection
- POST /CourseProgression/:userId

## Update
// allows for new points from assignments to be added to a document
- PUT /CourseProgression/:userId/:courseId
### Deleting a Module
// has to delete document from modules collection and has to update course.modules, as well as "course progression" collection

## Delete
### Deleting a course
// has to delete document from modules collection and has to delete document from course collection, as well as deleting a document from  "course progression" collection.

# Users
## Get
// Get all users for a specific course
- GET /users/:courseId
// Get a user with a specific username (username is unique)
- GET /users/:username
### Authenticate user
// get data from database and check if the given username and password are correct, if they are check if there is a token for the user that has yet to expire, and is not about to expire, if so return this token to the user, otherwise generate store and return a new token to the user.
## Post
// allows a person to create a new user
- POST /users
## Update
// Allows for the updating of a users information
- PUT /users/:username

## Delete
### Deleting a User
// has to update both users collection, as well as the course.participants[].

# Modules
## Get
// Fetch a Specific Module
- GET /modules/:moduleId
## Post
### create module
// has to update course.module infromation and has to add a document to modules collection
// allows a teacher to create a single new course
- POST /modules
// allows a teacher to create multiple new courses
- POST /modules

## Update
// used for updating a courses contents
- PUT /modules/:moduleId/content

## Delete
### Deleting a course
// has to delete document from modules collection and has to delete document from course collection, as well as deleting a document from  "course progression" collection.
### Deleting a Module
// has to delete document from modules collection and has to update course.modules, as well as "course progression" collection



# Other
## Enroll in class
// Has to update courses.participants[] and create a new document in "course progression" collection

## create module
// has to update course.module infromation and has to add a document to modules collection

## Deleting a course
// has to delete document from modules collection and has to delete document from course collection, as well as deleting a document from  "course progression" collection.

## Deleting a Module
// has to delete document from modules collection and has to update course.modules, as well as "course progression" collection

## Deleting a User
// has to update both users collection, as well as the course.participants[].

## Authenticate user
// get data from database and check if the given username and password are correct, if they are check if there is a token for the user that has yet to expire, and is not about to expire, if so return this token to the user, otherwise generate store and return a new token to the user.