- Get Courses
works! path Get /courses

-Get Courses Archived
Works! path Get /courses/archived

- Get User's Enrolled Courses
Works! path Get /courses/user/:username

- Get Specific Courses using _ID
Works! path Get /courses/:courseId

- Get Specific user using username
Works! path Get /users/:username

- Get User Progress
Works! path Get /courseProgression/:userId/:courseId

- Get Modules
Works! path Get /modules/:moduleId

- Get Specific Modules using _ID

- Get Users for specific course
Works! path Get /users/course/:courseId

- Get All User Accounts
Works! path Get /users

- Add Course Participants
Works! path Post /courseProgression

- Add Course
Works! path Post /courses

- Add Modules
Works! path Post /modules

- Add User Accounts
Works! path Post /users

- Update Students Course Progression
Works! path Put /courseProgression/:userId/:courseId

- Update Module Content
Works! path Put /modules/content/:moduleId

- Update Course
Works! path Put /courses/:courseId

- Update Account Information
Works! path Put /users/:username

- Delete Course
Works! path Delete /courses/:courseId

- Delete User
Works! path Delete /users/:userId

- Delete Module
Works! path Delete /modules/:moduleId

- Delete Course Progression
Works! path Delete /courseProgression/progress/:userId/:courseId

- Delete Students Enrollment
Works! path Delete /courses/:courseId/participants/:username

- Archive Course
Works! path Put /courses/:courseId/archive

- Unarchive Course
Works! path Put /courses/:courseId/unarchive
