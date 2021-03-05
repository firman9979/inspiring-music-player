# Relaxing News Portal Server
Our Relaxing News Portal App is an application to display quotes, today's news, a spotify playlist, and a peaceful picture, in order to induce a relaxed vibe while reading news. This app has : 
* RESTful endpoints for authentication and getting APIs
* JSON formatted response
* List of Errors and its Responses

&nbsp;

## RESTful endpoints
```
POST /register
POST /login
POST /google-login
GET /getNews
GET /quotes
GET /pictures
```

---
## 1. POST /register

> Registering a new User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>",
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "<email>"
}
```

_Errors_
```
{
  400 - Validation Error(s),
  500 - Internal Server Error
}
```

---
## 2. POST /login

> Log into an existing user's account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>",
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
}
```

_Errors_
```
{
  404 - Validation Error(s),
  500 - Internal Server Error
}
```

---
## 3. POST /google-login

> Log in user use Google OAuth for an existing user's account, and create account for nonexistent user account.

_Request Header_
```
not needed
```

_Request Body_
```
{
  "token": "<token_id from Google>",
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
}
```

_Errors_
```
{
  500 - Internal Server Error
}
```

---
## 4. GET /news

> Get all news

_Request Header_
```
{
    "access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    title: "<title>",
    content: "<content>",
    published: "<published_date>",
    url: "<news_url>",
    image_url: "<image_url>"
  },
  {
    title: "<title>",
    content: "<content>",
    published: "<published_date>",
    url: "<news_url>",
    image_url: "<image_url>"
  },
  {
    title: "<title>",
    content: "<content>",
    published: "<published_date>",
    url: "<news_url>",
    image_url: "<image_url>"
  },
  {
    title: "<title>",
    content: "<content>",
    published: "<published_date>",
    url: "<news_url>",
    image_url: "<image_url>"
  }
  ...
]
```

_Errors_
```
{
  500 - Internal Server Error
}
```

---
## 5. GET /pictures

> Get a picture

_Request Header_
```
{
    "access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    result: "<image_url>"
}
```

_Errors_
```
{
  500 - Internal Server Error
}
```

---
## 6. GET /quotes

> Get a quote

_Request Header_
```
{
    "access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
"<quote>"
```

_Errors_
```
{
  500 - Internal Server Error
}
```

&nbsp;

---
## 7. Errors

_Response (400 - Validation Error(s))_
```
{
  "message": "<list of validation errors>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Resource not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error"
}
```
