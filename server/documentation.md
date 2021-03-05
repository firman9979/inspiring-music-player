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
GET /getNews
GET /quotes
GET /pictures
```

### POST /register

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
### POST /login

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
### GET /news

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
### GET /pictures

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
### GET /quotes

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
## Errors

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
