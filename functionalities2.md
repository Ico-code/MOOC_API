# API Path Documentation

This section of the documentation will be going over the Request Body, API Response, Data Validation and Error Handling on the API side.

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
    },
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
``` JSON
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

## GET /courses/user/:userId
### Request Body
```json
{
  "courseId": "<courseId>"
}
```

### API Response
#### Successful Response (Status Code 200)

Description: If the query to fetch the course with the specified ID succeeds, the API responds with a status code of 200 (OK).
Response Body: The course object that matches the provided courseId, adhering to the schema.
Example:
```JSON
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

## GET /modules/:moduleId
### Request Body

### API Response





## GET /courseProgression/:userId
### Request Body

### API Response





## GET /users/:username
### Request Body

### API Response





## GET /users/:courseId
### Request Body

### API Response





## POST /courseProgression/:userId
### Request Body

### API Response





## POST /courses
### Request Body

### API Response





## POST /modules
### Request Body

### API Response





## POST /users
### Request Body

### API Response





## PUT /courseProgression/:userId/:courseId
### Request Body

### API Response





## PUT /modules/:moduleId/content
### Request Body

### API Response





## PUT /courses/:courseId
### Request Body

### API Response





## PUT /users/:username
### Request Body

### API Response





## DELETE /courses/:courseId
### Request Body

### API Response





## DELETE /users/:userId
### Request Body

### API Response





## DELETE /modules/:moduleId
### Request Body

### API Response





## DELETE /courseProgression/:userId/:courseId
### Request Body

### API Response





## PUT /courses/:courseId/archive
### Request Body

### API Response





## PUT /courses/:courseId/participants/:userId
### Request Body

### API Response




