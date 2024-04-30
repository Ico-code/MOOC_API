# Online Educational Platform

This is the api for a Course-site, designed to facilitate the delivery of educational courses to its users.
This Project is built using Nodejs and Express, and it will later be connected to a Reactjs frontend, to make its contents easier to access, and study.

Gituhb:https://github.com/Ico-code/MOOC_API
Render: 

# API Functionalities:

- Get Courses
- Get User's Enrolled Courses
- Get Specific Courses using _ID
- Get User Progress
- Get Modules
- Get Specific Modules using _ID
- Get User Accounts
- Add Course Participants
- Add Course
- Add Modules
- Add User Accounts
- Update Students Course Progression
- Update Module Content
- Update Course
- Update Student Progress
- Delete Course
- Delete User
- Delete Module
- Delete Course Progression
- Archive Course
- Delete Students Enrollment

# User Requirements

This section will contain some information on possible requirements, that student and instructor might have for the application.

## Student Requirements
1. Course Search and Discovery:

    Students want to find relevant courses quickly. Implement robust search functionality, filters, and sorting options.

2. Course Details:

    Students need detailed information about each course, learning objectives, prerequisites, and instructor details.

3. Enrollment Process:

    A straightforward enrollment process is crucial. Students should be able to enroll in courses with minimal effort.

4. Notifications and Reminders:

    Students appreciate reminders for upcoming classes, assignment deadlines, and quizzes. Implement email or in-app notifications.

5. Progress Tracking:

    Students want to monitor their progress. Provide a dashboard showing completed modules, grades, and overall progress.

6. Interactive Content:

    Engaging content such as quizzes, discussion forums, and interactive assignments keeps students motivated.

7. Access to Course Materials:

    Ensure students can easily access lecture slides, videos, readings, and other course materials.

8. Collaboration Tools:

    Students may need group projects or collaboration features. Consider integrating chat, forums, or shared document spaces.

9. Feedback and Support:

    Students appreciate timely feedback on assignments and the ability to ask questions. Provide a support system.

## Instructor Requirements
1. Course Creation and Management:

    Instructors need tools to create, edit, and organize course content. This includes adding modules, lectures, assignments, quizzes, and other learning materials. They should be able to schedule course releases to control when content becomes available to students.
    Managing assessments (such as quizzes and exams) is crucial. Instructors should be able to set up assessments, grade submissions, and provide feedback.

2. Communication Tools:

    Instructors need ways to communicate with students. This could include announcements, discussion forums, or direct messaging.
    Features like email notifications for important updates are essential.

3. Gradebook and Progress Tracking:

    An integrated gradebook allows instructors to manage student grades efficiently.
    Tracking student progress (e.g., completed modules, assignments submitted) helps instructors monitor individual performance.

4. Content Authoring Tools:

    Instructors should be able to create multimedia content (videos, presentations, etc.) directly within the platform.
    Integration with external tools (e.g., video recording software, interactive quiz builders) can enhance content creation.

# Analysis of requirements and Api functionalities
In the section below i will adress whether the API functionalities listed above, meet the requiremtns that students and instructor could have of this application.

## Student Requirements Analysis
1. Course Search and Discovery: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    The "Get Courses" functionality can support course discovery but may need additional filtering and sorting options to fully meet this requirement.

2. Course Details and Syllabus: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    The "Get Specific Courses using _ID" functionality allows retrieving detailed information about specific courses, which should include syllabus, learning objectives, etc.

3. Enrollment Process: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    The "Add Course Participants" functionality allows adding students to courses, which supports the enrollment process.

4. Notifications and Reminders: <span style="color:red">(Won't add this functionality, as it is not required for the current scope of the project)</span>

    Notifications and reminders functionality is not directly covered by the provided API functionalities. This would likely require additional implementation.

5. Progress Tracking: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Points earned from quizes can be stored in Course Progression Collection, which allows for student points to be stored. the The "Get User Progress" functionality can support progress tracking by providing information about completed modules and overall progress.

6. Interactive Content: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Interactive content creation can be accomplished by inserting content into the modules collection.

7. Access to Course Materials: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Accessing course materials such as lecture slides, videos, etc., can be accomplished by using the "Get Module" functionality.

8. Collaboration Tools: <span style="color:red">(Won't add this functionality, as it is not required for the current scope of the project)</span>

    Collaboration tools such as chat, forums, etc., are not directly supported by the provided API functionalities. Additional integration or development may be needed.

9. Feedback and Support: <span style="color:red">(Won't add this functionality, as it is not required for the current scope of the project)</span>

    While feedback and support cannot be given directly using the API, since the student and teachers are capeable of using e-mail services they can simply use the functionality for searching for a users email address, which they can then use for communication, although I will admit this is a very subpar solution for this kind of a service, but implementing a whole chat service, would in and of itself be too big of a task for the current scope of this project. 

### Improvements based on analysis
While there are certain improvements that could certainly be made to the API, most of them do not fall under the scope of this project, as they would take considerable effort to implement.

## Instructor Requirements Analysis
1. Course Creation and Management: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Most of the instructor requirements related to course creation and management are directly covered by the provided API functionalities. Additional functionalities such as managing assessments, etc., should be considered.

2. Communication Tools: <span style="color:red">(Won't add this functionality, as it is not required for the current scope of the project)</span>

    Communication tools such as announcements, discussion forums, etc., are not covered by the provided API functionalities. Additional integration or development would be necessary.

3. Gradebook and Progress Tracking: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Gradebook management and progress tracking are supported by the "Update Student Course Progression" and "Get User Progress".

4. Content Authoring Tools: <span style="color:Green">(This functionality is covered by the functionalities)</span>

    Content authoring tools are directly covered by the provided API functionalities. Additional features may have to be implemented if pictures and other documents want to be added.

### Improvements based on analysis
Most requirements are already met by the functionalities, and the rest don't fall under the scope of this project, either due to difficulties potentially creating them, or due to techinical limitations on the database side of things. 

# Database Structure

This project will be using mongodb for its database, the following section includes details about the structure of the database.

## Courses Collection
Originally i was thinking of implementing the following fiel, but I ended up abandoning it because it doesn't really fit into the scope of the project. `courseType:string, // there will be two types of courses in this application "Time based", and "Free form"`

    {
    _id:ObjectId, // id of store item
    title:string Unique, // title of the course
    courseDetails:{ // details about the course
        description:string, // description of the courses contents
        lastUpdated:date, // when was the course last updated
        createdDate:date, // when was the course created
        duration:string, // how long should the course take to complete as a whole
        prerequisites:string // details about the prerequisites for the course
    },
    instructors:[username:string], // list of instructors for the course
    modules:[{ // list and information about the modules
        moduleId:ObjectId, // id of the module (foreign key)
        title:string, // title for the course modules
        score:number, // total amount of point earnable through this module
        duration:string, // duration for the course modules
        order:number // order for the course modules
        }], // list of all of the modules in a course
    participants:[ username:string], // a list of usernames of the student who are taking this course
    isArchived:Boolean // is the course archived, or is it still in active use
    }

## Course Progression Collection

    {
    _id: ObjectId, // Unique identifier for the progress document
    userId: ObjectId, // Reference to the user document (foreign key)
    courseId: ObjectId, // Reference to the course document (foreign key)
    modulesProgress: [{
        moduleId: ObjectId, // Reference to the module document (foreign key)
        completionStatus: Boolean, // True if the module is completed, False otherwise
        totalScore: Number, // Overall score achieved in the module (optional)
        modulesProgress: [{ // Array to track individual assignment progress within the module (optional)
            assignmentId: ObjectId, // Reference to the assignment document within the module (optional)
            score: Number, // Score achieved in the assignment
            completed: Boolean // True if the assignment is completed, False otherwise
        }]
    }]
    }

## Users Collection

    {
    _id:ObjectId, // id of store item
    role:string, // information on whether the user is a student or a teacher
    email:string, // the users email so that they can be contacted, if need be
    username:string Unique, // accounts username
    password:string // accounts password
    }

## Modules Collection

    {
    _id:ObjectId, // modules id
    title:string, // title of the module
    material:[{//Content to be taught in the module (e.g., lecture notes, videos, etc.)
        content_type:string,
        content:array|object|string
    }], 
    courseId:ObjectId //for the course it is part of
    }

### Module Material Content types:
There will be many different types of content that a teacher may want to showcase to their student, thus
the materials array will contain a content_type field, that will explain to the software what type of content is to be shown,
as well as how the content is formated in the content field.

Here are some content types shown in a schema format:
    {    
        content_type:"text/plain"
        content:"Hello World! Display this text as is"
    },
    {
        content_type:"HTML"
        content:"`<p>Hello World! Display this text as is</p>`"
    },
    {
        content_type:"picture"
        content:"`<img src="someURLHere.com">`"
    },
    {
        content_type:"quiz"
        content:[{
            question:"What is Your Name?",
            answers:[
                "Dave","Jack","Tony"
            ]
            correct_answer:"Dave"
       },{
            question:"What is the name of the current president of America?",
            answers:[
                "Joe Biden","Jack","Tony"
            ]
            correct_answer:"Joe Biden"
       }]
    },
## Indexes
Below are some index that will be implmented into the database

### Course Progression Collection
Index on userId:

    This index will help in quickly retrieving course progress for a specific user.
    `db.CourseProgressionCollection.createIndex({ userId: 1 });`

Index on courseId:

    This index will facilitate efficient retrieval of course progress for a specific course.
    `db.CourseProgressionCollection.createIndex({ courseId: 1 });`

Compound Index on userId and courseId:

    This compound index can be beneficial for queries that involve both user and course criteria. `db.CourseProgressionCollection.createIndex({ userId: 1, courseId: 1 });`

### Users Collection
Index on username:

    This index will enable quick retrieval of user documents by username, which is often used for authentication.
    `db.UsersCollection.createIndex({ username: 1 }, { unique: true });`

### Modules Collection
Index on courseId:

    This index will aid in efficiently retrieving modules belonging to a specific course.
    `db.ModulesCollection.createIndex({ courseId: 1 });`

### Courses Collection
Index on title:

    This index will facilitate quick retrieval of courses by their title, which is often used for search and identification purposes.
    `db.CoursesCollection.createIndex({ title: 1 }, { unique: true });`

Index on instructors:

    This index can assist in retrieving courses taught by a specific instructor.
    `db.CoursesCollection.createIndex({ instructors: 1 });`

Index on participants.username:

    This index will allow MongoDB to quickly find all documents where the specified username appears in the participants array, enabling efficient retrieval of courses for a specific student.
    `db.CoursesCollection.createIndex({ "participants.username": 1 });`

# API Requirements and Documentation

## Paths

### List of paths:
- GET /courses
- GET /courses/:userId
- GET /courses/:courseId
- GET /modules/:moduleId
- GET /courseProgression/:userId
- GET /users/:username
- GET /users/:courseId
- POST /courseProgression/:userId
- POST /courses
- POST /modules
- POST /users
- PUT /courseProgression/:userId/:courseId
- PUT /modules/:moduleId/content
- PUT /courses/:courseId
- PUT /users/:username
- DELETE /courses/:courseId
- DELETE /users/:userId
- DELETE /modules/:moduleId
- DELETE /courseProgression/:userId/:courseId
- PUT /courses/:courseId/archive
- PUT /courses/:courseId/participants/:userId

### Get
This part will cover the paths for getting data from the collections using this API.

#### Data Validation

#### Error Handling

### Post
This part will cover the paths for posting data from the collections using this API.

#### Data Validation

#### Error Handling

### Update
This part will cover the paths for updating data from the collections using this API.

#### Data Validation

#### Error Handling

### Delete
This part will cover the paths for deleting data from the collections using this API.

#### Data Validation

#### Error Handling

### Other
This part will cover the paths for other functionalities using this API.

#### Authentication

##### Data Validation

##### Error Handling


## Other Features
