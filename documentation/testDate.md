# Create Student

```JSON
{
  "role": "student",
  "email": "student@example.com",
  "username": "jack",
  "password": "password"
}
```

```JSON
{
  "role": "student",
  "email": "sarah@example.com",
  "username": "sarah_student",
  "password": "student123"
}
```

# Create Teacher

```
{
  "role": "teacher",
  "email": "teacher@example.com",
  "username": "teacher123",
  "password": "teacherpassword"
}
```

```
{
  "role": "teacher",
  "email": "another.teacher@example.com",
  "username": "another_teacher",
  "password": "teacherpass123"
}
```

# Create Course

```JSON
{
  "title": "Introduction to Programming",
  "courseDetails": {
    "description": "This course provides an introduction to programming concepts.",
    "duration": "10 weeks",
    "prerequisites": "None"
  },
  "instructors": ["another_teacher", "teacher123"],
  "participants": [],
  "isArchived": false
}
```

```JSON
{
  "title": "Introduction to C++",
  "courseDetails": {
    "description": "This course provides an introduction to C++ programming concepts.",
    "duration": "6 weeks",
    "prerequisites": "None"
  },
  "instructors": ["another_teacher", "teacher123"],
  "participants": [],
  "isArchived": false
}
```

# Create two Modules

```JSON
[
   {
  "title": "Introduction to Programming",
  "totalScore": 100,
  "duration": "2 weeks",
  "order": 1,
  "material": [
    {
      "content_type": "text",
      "score": 20,
      "content": "This module introduces the basics of programming concepts."
    },
    {
      "content_type": "video",
      "score": 30,
      "content": "https://example.com/intro_to_programming_video"
    },
    {
      "content_type": "quiz",
      "score": 50,
      "content": {
        "question":"Who is the current President of the USA?",
        "asnwers":[
            "Donal Trump",
            "Joe Biden",
            "Obama Barack"
        ],
        "correctAnswer":"Joe Biden"
      }
    }
  ],
  "courseId": "6630bd06d4f15f7601520ca2"
},
 {
  "title": "Advanced Data Structures",
  "totalScore": 150,
  "duration": "3 weeks",
  "order": 2,
  "material": [
    {
      "content_type": "text",
      "score": 30,
      "content": "This module covers advanced data structures such as trees and graphs."
    },
    {
      "content_type": "video",
      "score": 50,
      "content": "https://example.com/advanced_data_structures_video"
    },
    {
      "content_type": "quiz",
      "score": 70,
      "content": "https://example.com/advanced_data_structures_quiz"
    }
  ],
  "courseId": "6630c66b4c2b3b5d8a265767"
}]
```
# Add student to course
```JSON
{
    "userId":"6630ba0d6ce0fe010a348ba0",
    "courseId":"6630c66b4c2b3b5d8a265767"
}
```
```JSON
{
    "userId":"6630b9de6ce0fe010a348b9e",
    "courseId":"6630c66b4c2b3b5d8a265767"
}
```