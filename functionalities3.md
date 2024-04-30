# API Path Documentation

This section of the documentation will be going over the Request Body, API Response, Data Validation and Error Handling on the API side.

# Courses

## GET /courses

### Request Body

Get Request for all the courses doesn't require further information.

### API Response

#### Successful Response (Status Code 200):

If the query to fetch non-archived courses succeeds, the API would respond with a status code of 200 (OK).
The response body would contain an array of course objects, each adhering to the schema.
Example (simplified):
JSON

```json
{
  "courses": [
    {
      "_id": "615a7c8e1f6b8d0012345678",
      "title": "Introduction to Web Development",
      "courseDetails": {
        "description": "Learn the basics of web development.",
        "lastUpdated": "2023-05-01T10:00:00Z",
        "createdDate": "2023-04-15T14:30:00Z",
        "duration": "4 weeks",
        "prerequisites": "Basic HTML and CSS knowledge"
      },
      "instructors": ["615a7c8e1f6b8d0012345679"],
      "participants": ["615a7c8e1f6b8d0012345680"],
      "isArchived": false
    }
  ]
}
```

#### Error Response (Status Code 500):

If there’s an error during the database query (e.g., database connection issue), the API would respond with a status code of 500 (Internal Server Error).
The response body would contain an error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

Since no data needs to be provided to this part of the API, there is no need to validate data

## Get /courses/archived

### Request Body

A GET request for all archived courses doesn't require further information.

### API Response

#### Successful Response (Status Code 200)

Description: If the query to fetch archived courses succeeds, the API responds with a status code of 200 (OK).
Response Body: An array of archived course objects, each adhering to the schema.
Example:

```json
[
  {
    "_id": "615a7c8e1f6b8d0012345678",
    "title": "Advanced Web Development",
    "courseDetails": {
      "description": "Take your web development skills to the next level.",
      "lastUpdated": "2023-06-01T09:00:00Z",
      "createdDate": "2023-04-15T14:30:00Z",
      "duration": "6 weeks",
      "prerequisites": "Intermediate knowledge of HTML, CSS, and JavaScript"
    },
    "instructors": ["615a7c8e1f6b8d0012345679"],
    "participants": ["615a7c8e1f6b8d0012345680"],
    "isArchived": true
  }
]
```

#### Error Response (Status Code 500)

Description: If there’s an error during the database query (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

## GET /courses/:courseId

### Request Body

```JSON
{
  "courseId": "<courseId>"
}
```

### API Response

#### Successful Response (Status Code 200)

- Description: If the query to fetch the course with the specified ID succeeds, the API responds with a status code of 200 (OK).
- Response Body: The course object that matches the provided `courseId`, adhering to the schema.
- Example:

```json
{
  "_id": "615a7c8e1f6b8d0012345678",
  "title": "Introduction to Web Development",
  "courseDetails": {
    "description": "Learn the basics of web development.",
    "lastUpdated": "2023-05-01T10:00:00Z",
    "createdDate": "2023-04-15T14:30:00Z",
    "duration": "4 weeks",
    "prerequisites": "Basic HTML and CSS knowledge"
  },
  "instructors": ["615a7c8e1f6b8d0012345679"],
  "participants": ["615a7c8e1f6b8d0012345680"],
  "isArchived": false
}
```

#### Error Response (Status Code 404)

Description: If no course is found with the provided courseId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 400)

Description: If the provided courseId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the database query (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

## GET /courses/user/:username

### Request Body

```json
{
  "username": "string"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: Returns an array of classes in which the user is participating.
Response Body: An array of course objects.
Example:

```JSON
[
  {
    "_id": "<courseId1>",
    "name": "<courseName1>",
    "participants": ["<username>", "<anotherUsername>"],
    ...
  },
  {
    "_id": "<courseId2>",
    "name": "<courseName2>",
    "participants": ["<username>"],
    ...
  },
  ...
]
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the retrieval process.
Response Body: An error message in JSON format, along with the error details.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<errorDetails>"
}
```

## POST /courses/

### Request Body

```json
{
  "title": "<title>",
  "description": "<description>",
  "duration": "<duration>",
  "prerequisites": "<prerequisites>",
  "instructors": ["<instructor1>", "<instructor2>", ...],
  "participants": ["<participant1>", "<participant2>", ...]
}
```

- title (string, required): Title of the course.
- description (string, required): Description of the course.
- duration (string, required): Duration of the course.
- prerequisites (string, required): Prerequisites for the course.
- instructors (array of strings, required): Array of usernames of instructors who will teach the course.
- participants (array of strings): Array of usernames of participants enrolled in the course.

### API Response

#### Successful Response (Status Code 201)

Description: If the course creation is successful, the API responds with a status code of 201 (Created).
Response Body: The newly created course object, adhering to the schema.
Example:

```JSON
{
  "_id": "615a7c8e1f6b8d0012345678",
  "title": "Introduction to Web Development",
  "courseDetails": {
    "description": "Learn the basics of web development.",
    "createDate": "2023-04-15T14:30:00Z",
    "lastUpdated": "2023-04-15T14:30:00Z",
    "duration": "4 weeks",
    "prerequisites": "Basic HTML and CSS knowledge"
  },
  "instructors": ["<instructor1>", "<instructor2>"],
  "participants": ["<instructor1>"],
  "isArchived": false
}
```

#### Error Response (Status Code 400)

Description: If the request body is invalid or missing required fields, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format specifying the issue.
Example:

```JSON
{
  "error": "Title is required and must be a non-empty string"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the course creation process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

### Data Validation

The API validates the request body to ensure all required fields are provided and have the correct data types.
It also checks if the provided instructors exist and have the appropriate role ('teacher').
The participants field is optional and can be an array of strings representing usernames.

## PUT /courses/:courseId

### Request Body

```json
{
  "title": "<title>",
  "description": "<description>",
  "duration": "<duration>",
  "prerequisites": "<prerequisites>",
  "instructors": ["<instructor1>", "<instructor2>", ...],
  "isArchived": true|false
}
```

- title (string): Updated title of the course.
- description (string): Updated description of the course.
- duration (string): Updated duration of the course.
- prerequisites (string): Updated prerequisites for the course.
- instructors (array of strings): Updated array of usernames of instructors who will teach the course.
- participants (array of strings): Updated array of usernames of participants enrolled in the course.
- isArchived (boolean): Updated status indicating whether the course is archived.

### API Response

#### Successful Response (Status Code 200)

Description: If the course update is successful, the API responds with a status code of 200 (OK).
Response Body: The updated course object, adhering to the schema.
Example:

```JSON
{
  "_id": "<courseId>",
  "title": "<updatedTitle>",
  "courseDetails": {
    "description": "<updatedDescription>",
    "duration": "<updatedDuration>",
    "prerequisites": "<updatedPrerequisites>"
  },
  "instructors": ["<updatedInstructor1>", "<updatedInstructor2>", ...],
  "participants": ["<updatedParticipant1>", "<updatedParticipant2>", ...],
  "isArchived": true|false
}
```

#### Error Response (Status Code 400)

Description: If the provided courseId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the course update process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

### Data Validation

The API validates the courseId parameter to ensure it is a valid MongoDB ObjectId.
The API validates the request body to ensure all provided fields have the correct data types.

## PUT /courses/:courseId/archive

### Request Body

No request body is required.

### API Response

#### Successful Response (Status Code 200)

Description: If the course archiving is successful, the API responds with a status code of 200 (OK).
Response Body: The updated course object, adhering to the schema.
Example:

```json
{
  "_id": "<courseId>",
  "title": "<courseTitle>",
  "courseDetails": {
    "description": "<courseDescription>",
    "duration": "<courseDuration>",
    "prerequisites": "<coursePrerequisites>"
  },
  "instructors": ["<instructor1>", "<instructor2>", ...],
  "participants": ["<participant1>", "<participant2>", ...],
  "isArchived": true
}
```

#### Error Response (Status Code 404)

Description: If no course is found with the provided courseId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 400)

Description: If the provided courseId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the course archiving process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

### Data Validation

The API validates the courseId parameter to ensure it is a valid MongoDB ObjectId.

## DELETE /courses/:courseId/participants/:username

### Request Body

No request body is required.

### API Response

#### Successful Response (Status Code 200)

Description: If the participant removal from the course is successful, the API responds with a status code of 200 (OK).
Response Body: The updated course object after removing the participant, adhering to the schema.
Example:

```JSON
{
  "_id": "<courseId>",
  "title": "<courseTitle>",
  "courseDetails": {
    "description": "<courseDescription>",
    "duration": "<courseDuration>",
    "prerequisites": "<coursePrerequisites>"
  },
  "instructors": ["<instructor1>", "<instructor2>", ...],
  "participants": ["<remainingParticipant1>", "<remainingParticipant2>", ...],
  "isArchived": false
}
```

#### Error Response (Status Code 404)

Description: If no course is found with the provided courseId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 400)

Description: If the provided courseId or userId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId or userId"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the participant removal process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the courseId and userId parameters to ensure they are valid MongoDB ObjectIds.

## DELETE /courses/:courseId

### Request Body

No request body is required.

### API Response

#### Successful Response (Status Code 200)

- Description: If the course deletion is successful, the API responds with a status code of 200 (OK).
- Response Body: The deleted course object, adhering to the schema.
- Example:

```json
{
  "_id": "<courseId>",
  "title": "<courseTitle>",
  "courseDetails": {
    "description": "<courseDescription>",
    "duration": "<courseDuration>",
    "prerequisites": "<coursePrerequisites>"
  },
  "instructors": ["<instructor1>", "<instructor2>", ...],
  "participants": ["<participant1>", "<participant2>", ...],
  "isArchived": false
}
```

#### Error Response (Status Code 404)

Description: If no course is found with the provided courseId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 400)

Description: If the provided courseId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the course deletion process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the courseId parameter to ensure it is a valid MongoDB ObjectId.

# Modules

## GET /modules/:moduleId

### Request Body

No request body is required.

### API Response

#### Successful Response (Status Code 200)

Description: If the query to fetch the module with the specified ID succeeds, the API responds with a status code of 200 (OK).
Response Body: The module object that matches the provided `moduleId`, adhering to the schema.
Example:

```JSON
{
  "_id": "<moduleId>",
  "title": "<moduleTitle>",
  "score": <moduleScore>,
  "duration": "<moduleDuration>",
  "order": <moduleOrder>,
  "material": [
    {
      "content_type": "<contentType>",
      "score": <contentScore>,
      "content": "<content>"
    },
    ...
  ],
  "courseId": "<courseId>"
}
```

#### Error Response (Status Code 404)

Description: If no module is found with the provided moduleId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Module not found"
}
```

#### Error Response (Status Code 400)

Description: If the provided moduleId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid module ID"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the module retrieval process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Database connection failed"
}
```

### Data Validation

The API validates the moduleId parameter to ensure it is a valid MongoDB ObjectId.

## POST /modules

### Request Body

```json
[
{
  "title": "<moduleTitle>",
  "score": <moduleScore>,
  "duration": "<moduleDuration>",
  "order": <moduleOrder>,
  "material": [
    {
      "content_type": "<contentType>",
      "score": <contentScore>,
      "content": "<content>"
    },
    ...
  ],
  "courseId": "<courseId>"
}
]
```

### API Response

#### Successful Response (Status Code 201)

Description: If the creation of the new module succeeds, the API responds with a status code of 201 (Created).
Response Body: The newly created module object, including its generated ID.
Example:

```JSON
{
  "_id": "<moduleId>",
  "title": "<moduleTitle>",
  "score": <moduleScore>,
  "duration": "<moduleDuration>",
  "order": <moduleOrder>,
  "material": [
    {
      "content_type": "<contentType>",
      "score": <contentScore>,
      "content": "<content>"
    },
    ...
  ],
  "courseId": "<courseId>"
}
```

#### Error Response (Status Code 400)

Description: If any of the required fields (title, courseId, material) are missing or invalid, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Title, courseId, and material array are required"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the module creation process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and data types of the required fields (title, courseId, material array) in the request body.
It also validates each item in the material array to ensure the presence of content_type and content, and the correct data types of content_type and optional score.

## PUT /modules/content/:moduleId

### Request Body

```JSON
{
  "material": [
    {
      "content_type": "<contentType>",
      "content": "<content>"
    },
    ...
  ]
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the update of module contents succeeds, the API responds with a status code of 200 (OK).
Response Body: The updated module object, including its new contents.
Example:

```JSON
{
  "_id": "<moduleId>",
  "title": "<moduleTitle>",
  "score": <moduleScore>,
  "duration": "<moduleDuration>",
  "order": <moduleOrder>,
  "material": [
    {
      "content_type": "<contentType1>",
      "content": "<content1>"
    },
    ...
  ],
  "courseId": "<courseId>"
}
```

#### Error Response (Status Code 400)

Description: If the material array is missing, empty, or contains invalid data, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Material array is required and must not be empty"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the module update process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and data types of the material array in the request body.
It also validates each item in the material array to ensure the presence of content_type and content, and the correct data type of content_type.

## DELETE /modules/:moduleId

### API Response

#### Successful Response (Status Code 200)

Description: If the deletion of the module succeeds, the API responds with a status code of 200 (OK).
Response Body: A success message indicating that the module has been deleted.
Example:

```JSON
{
  "message": "Module deleted"
}
```

#### Error Response (Status Code 400)

Description: If the provided moduleId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid moduleId"
}
```

#### Error Response (Status Code 404)

Description: If no module is found with the provided ID, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Module not found"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the module deletion process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and validity of the moduleId parameter.

# User

## POST /users/login

### Request Body

```json
{
  "username": "<username>",
  "password": "<password>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the provided username and password match a user in the database, the API responds with a status code of 200 (OK).
Response Body: An object containing a success message and the user details.
Example:

```JSON
{
  "message": "Authentication successful",
  "user": {
    "_id": "615a7c8e1f6b8d0012345678",
    "username": "example_user",
    "email": "example@example.com",
    "role": "student"
  }
}
```

#### Error Response (Status Code 400)

Description: If either the username or password is missing in the request body, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Username and password are required"
}
```

#### Error Response (Status Code 404)

Description: If no user is found with the provided username, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "User not found"
}
```

#### Error Response (Status Code 401)

Description: If the provided password does not match the password stored in the database for the given username, the API responds with a status code of 401 (Unauthorized).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Incorrect password"
}
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the process, the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "Error message"
}
```

## GET /users/course/:courseId

### Request Body

```JSON
{
  "courseId": "<courseId>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the request to fetch participants for a course succeeds, the API responds with a status code of 200 (OK).
Response Body: An array of user objects representing the participants of the course.
Example:

```JSON
[
  {
    "_id": "<userId>",
    "username": "<username>",
    "email": "<email>",
    "role": "<role>",
  },
  ...
]
```

#### Error Response (Status Code 400)

Description: If the provided courseId is invalid or missing, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 404)

Description: If no course is found with the provided courseId, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the process of fetching users for the course (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<error message>"
}
```

### Data Validation

The API validates the presence and data type of the courseId parameter. If the courseId is missing or not a valid ObjectId, the API responds with a 400 error.

## GET /users/:username

### Request Body

```JSON
{
  "username": "<username>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the request to fetch a user by username succeeds, the API responds with a status code of 200 (OK).
Response Body: The user object representing the user with the specified username.
Example:

```JSON
{
  "_id": "<userId>",
  "username": "<username>",
  "email": "<email>",
  "role": "<role>",
}
```

Error Response (Status Code 400)

Description: If the username parameter is missing or empty, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Username is required"
}
```

#### Error Response (Status Code 404)

Description: If no user is found with the provided username, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "User not found"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the process of fetching the user (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<error message>"
}
```

### Data Validation

The API validates the presence and non-empty nature of the username parameter. If the username is missing or empty, the API responds with a 400 error.

## POST /users

### Request Body

```JSON
{
  "role": "<role>",
  "email": "<email>",
  "username": "<username>",
  "password": "<password>"
}
```

### API Response

#### Successful Response (Status Code 201)

Description: If the creation of the new user succeeds, the API responds with a status code of 201 (Created).
Response Body: The newly created user object, including its generated ID.
Example:

```JSON
{
  "_id": "<userId>",
  "role": "<role>",
  "email": "<email>",
  "username": "<username>",
  "password": "<password>"
}
```

#### Error Response (Status Code 400)

Description: If any of the required fields (email, username, password) are missing or empty, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Email, username, and password are required"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the user creation process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<error message>"
}
```

### Data Validation

The API validates the presence and non-empty nature of the email, username, and password fields. If any of these fields are missing or empty, the API responds with a 400 error. If the role field is not provided, it defaults to "student".

## PUT /users/:username

### Request Body

```JSON
{
  "email": "<email>",
  "role": "<role>",
  "password": "<password>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the update of the user data succeeds, the API responds with a status code of 200 (OK).
Response Body: The updated user object.
Example:

```JSON
{
  "_id": "<userId>",
  "role": "<role>",
  "email": "<email>",
  "username": "<username>",
  "password": "<password>"
}
```

#### Error Response (Status Code 400)

Description: If any of the updated user data fields have invalid data types or values, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Email must be a string"
}
```

#### Error Response (Status Code 404)

Description: If the user with the specified username is not found, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "User not found"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the user update process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<error message>"
}
```

### Data Validation

The API validates the data types and values of the updated user data fields (email, role, password). If any field has an invalid data type or value, the API responds with a 400 error. If the user with the specified username is not found, the API responds with a 404 error.

## DELETE /users/:userId

### Request Body

```JSON
{
  "userId": "<userId>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: If the deletion of the user succeeds, the API responds with a status code of 200 (OK).
Response Body: The deleted user object.
Example:

```JSON
{
  "_id": "<userId>",
  "role": "<role>",
  "email": "<email>",
  "username": "<username>",
  "password": "<password>"
}
```

#### Error Response (Status Code 400)

Description: If the provided userId is not a valid MongoDB ObjectId, the API responds with a status code of 400 (Bad Request).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid userId"
}
```

#### Error Response (Status Code 404)

Description: If the user with the specified userId is not found, the API responds with a status code of 404 (Not Found).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "User not found"
}
```

#### Error Response (Status Code 500)

Description: If there’s an error during the user deletion process (e.g., database connection issue), the API responds with a status code of 500 (Internal Server Error).
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and format of the userId in the request body.
It ensures that the userId is a valid MongoDB ObjectId.

# Course Progression

## GET /courseProgression/:userId/:courseId

### Request Body

```JSON
{
  "userId": "<userId>",
  "courseId": "<courseId>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: Returns the course progression for the specified user and course.
Response Body: The course progression object.
Example:

```JSON
{
  "_id": "<progressId>",
  "userId": "<userId>",
  "courseId": "<courseId>",
  "progress": "<progress>"
}
```

#### Error Response (Status Code 400)

Description: If the provided userId or courseId is invalid.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid userId"
}
```

OR

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 404)

Description: If the course progression for the specified user and course is not found.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Progress not found for the specified user and course"
}
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the retrieval process.
Response Body: An error message in JSON format, along with the error details.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<errorDetails>"
}
```

Data Validation

The API validates the presence and format of the userId and courseId in the request body. It also ensures that both userId and courseId are valid MongoDB ObjectIds.

## POST /courseProgression/

### Request Body

```JSON
{
  "courseId": "<courseId>",
  "userId": "<userId>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: Returns the course progression for the enrolled user.
Response Body: The course progression object.
Example:

```JSON
{
  "_id": "<progressId>",
  "userId": "<userId>",
  "courseId": "<courseId>",
  "modulesProgress": []
}
```

#### Error Response (Status Code 400)

Description: If the provided userId or courseId is invalid.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid userId"
}
```

OR

```JSON
{
  "error": "Invalid courseId"
}
```

#### Error Response (Status Code 404)

Description: If the specified user or course is not found.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "User not found"
}
```

OR

```JSON
{
  "error": "Course not found"
}
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the enrollment process.
Response Body: An error message in JSON format, along with the error details.
Example:

```JSON
{
  "error": "Internal server error",
  "errMsg": "<errorDetails>"
}
```

### Data Validation

The API validates the presence and format of the userId in the request parameters and the courseId in the request body. It also ensures that both userId and courseId are valid MongoDB ObjectIds.

## PUT /courseProgression/:userId/:courseId

### Request Body

```JSON
{
  "moduleId": "<moduleId>",
  "assignmentId": "<assignmentId>",
  "score": "<score>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: Indicates that the user's progress has been successfully updated.
Response Body: A success message.
Example:

```JSON
{
  "message": "User progress updated successfully"
}
```

#### Error Response (Status Code 400)

Description: If the provided userId, courseId, moduleId, or assignmentId is invalid.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid userId or courseId"
}
```

OR

```JSON
{
  "error": "Invalid moduleId"
}
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the progress update process.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and format of the userId and courseId in the request parameters, as well as the moduleId in the request body. It also ensures that all provided IDs are valid MongoDB ObjectIds.

## DELETE /courseProgression/progress/:userId/:courseId

### Request Body

```JSON
{
  "userId": "<userId>",
  "courseId": "<courseId>"
}
```

### API Response

#### Successful Response (Status Code 200)

Description: Indicates that the progression data for the specified user and course has been successfully deleted.
Response Body: A success message.
Example:

```JSON
{
  "message": "Course progression deleted"
}
```

#### Error Response (Status Code 400)

Description: If the provided userId or courseId is invalid.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Invalid userId or courseId"
}
```

#### Error Response (Status Code 500)

Description: If there's an internal server error during the deletion process.
Response Body: An error message in JSON format.
Example:

```JSON
{
  "error": "Internal server error"
}
```

### Data Validation

The API validates the presence and format of the userId and courseId in the request parameters. It also ensures that both userId and courseId are valid MongoDB ObjectIds.
