# API Documentation for AUTH and USERS

## Base URL
The base URL for all API endpoints is: `https://api.example.com`

## Authentication

### Signup
Create a new user account.

**Route:** `/auth/signup`
**Method:** `POST`

**Request:**
- `email` (string): The email address of the user. (Required)
- `password` (string): The password for the user account. (Required)
- `type` (string): The type of user account (customer or designer). (Required)
- `companyName` (string): The name of the company (for designers). (Conditional)
- `phone` (number): The phone number of the user. (Conditional)
- `address` (string): The address of the user. (Conditional)
- `city` (string): The city of the user. (Conditional)
- `state` (string): The state of the user. (Conditional)
- `country` (string): The country of the user. (Conditional)
- `pincode` (number): The pincode of the user. (Conditional)
- `category` (string): The category of the designer (e.g., Architect, Interior Designer). (Conditional)
- `website` (string): The website URL of the designer. (Conditional)
- `facebook` (string): The Facebook URL of the designer. (Conditional)
- `instagram` (string): The Instagram URL of the designer. (Conditional)
- `linkedin` (string): The LinkedIn URL of the designer. (Conditional)

**Example Request:**
```json
POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "type": "designer",
  "companyName": "DesignCo",
  "phone": "9876543210",
  "address": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": 10001,
  "category": "Interior Designer",
  "website": "https://www.designco.com",
  "facebook": "https://www.facebook.com/designco",
  "instagram": "https://www.instagram.com/designco",
  "linkedin": "https://www.linkedin.com/in/designco"
}
```

**Response:**
- `user` (object): The created user object with details.
- `token` (string): JWT token for authentication.

**Example Response:**
```json
{
  "user": {
    "_id": "12345abcde",
    "email": "user@example.com",
    "type": "designer",
    "companyName": "DesignCo",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": 10001,
    "category": "Interior Designer",
    "website": "https://www.designco.com",
    "facebook": "https://www.facebook.com/designco",
    "instagram": "https://www.instagram.com/designco",
    "linkedin": "https://www.linkedin.com/in/designco",
    "projects": [],
    "reviews": [],
    "rating": 0,
    "isVerified": false,
    "contacts": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Signin
Sign in to an existing user account.

**Route:** `/auth/signin`
**Method:** `POST`

**Request:**
- `email` (string): The email address of the user. (Required)
- `password` (string): The password for the user account. (Required)

**Example Request:**
```json
POST /auth/signin
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
- `user` (object): The user object with details.
- `token` (string): JWT token for authentication.

**Example Response:**
```json
{
  "user": {
    "_id": "12345abcde",
    "email": "user@example.com",
    "type": "designer",
    "companyName": "DesignCo",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": 10001,
    "category": "Interior Designer",
    "website": "https://www.designco.com",
    "facebook": "https://www.facebook.com/designco",
    "instagram": "https://www.instagram.com/designco",
    "linkedin": "https://www.linkedin.com/in/designco",
    "projects": [],
    "reviews": [],
    "rating": 0,
    "isVerified": false,
    "contacts": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## User Management

### Update User
Update user details.

**Route:** `/auth/:id`
**Method:** `PUT`

**Request:**
- `companyName` (string): The updated name of the company (for designers). (Optional)
- `phone` (number): The updated phone number of the user. (Optional)
- `address` (string): The updated address of the user. (Optional)
- `city` (string): The updated city of the user. (Optional)
- `state` (string): The updated state of the user. (Optional)
- `country` (string): The updated country of the user. (Optional)
- `pincode` (number): The updated pincode of the user. (Optional)
- `category` (string): The updated category of the designer. (Optional)
- `website` (string): The updated website URL of the designer. (Optional)
- `facebook` (string): The updated Facebook URL of the designer. (Optional)
- `instagram` (string): The updated Instagram URL of the designer. (Optional)
- `linkedin` (string): The updated LinkedIn URL of the designer. (Optional)

**Example Request:**
```json
PUT /auth/12345abcde
{
  "companyName": "New DesignCo",
  "phone": "9876543210",
  "address": "456 Park Avenue",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": 10002,
  "category": "Architect",
  "website": "https://www.newdesignco.com",
  "facebook": "https://www.facebook.com/newdesignco",
  "instagram": "https://www.instagram.com/newdesignco",
  "linkedin": "https://www.linkedin.com/in/newdesignco"
}
```

**Response:**
- `user` (object): The updated user object with details.

**Example Response:**
```json
{
  "user": {
    "_id": "12345abc

de",
    "email": "user@example.com",
    "type": "designer",
    "companyName": "New DesignCo",
    "phone": "9876543210",
    "address": "456 Park Avenue",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": 10002,
    "category": "Architect",
    "website": "https://www.newdesignco.com",
    "facebook": "https://www.facebook.com/newdesignco",
    "instagram": "https://www.instagram.com/newdesignco",
    "linkedin": "https://www.linkedin.com/in/newdesignco",
    "projects": [],
    "reviews": [],
    "rating": 0,
    "isVerified": false,
    "contacts": []
  }
}
```

## Data Models

### SignupDTO
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.
- `type` (string): The type of user account (customer or designer).
- `companyName` (string): The name of the company (for designers).
- `phone` (number): The phone number of the user.
- `address` (string): The address of the user.
- `city` (string): The city of the user.
- `state` (string): The state of the user.
- `country` (string): The country of the user.
- `pincode` (number): The pincode of the user.
- `category` (string): The category of the designer (e.g., Architect, Interior Designer).
- `website` (string): The website URL of the designer.
- `facebook` (string): The Facebook URL of the designer.
- `instagram` (string): The Instagram URL of the designer.
- `linkedin` (string): The LinkedIn URL of the designer.

### SigninDTO
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.

### UpdateUserDTO
- `companyName` (string): The updated name of the company (for designers).
- `phone` (number): The updated phone number of the user.
- `address` (string): The updated address of the user.
- `city` (string): The updated city of the user.
- `state` (string): The updated state of the user.
- `country` (string): The updated country of the user.
- `pincode` (number): The updated pincode of the user.
- `category` (string): The updated category of the designer.
- `website` (string): The updated website URL of the designer.
- `facebook` (string): The updated Facebook URL of the designer.
- `instagram` (string): The updated Instagram URL of the designer.
- `linkedin` (string): The updated LinkedIn URL of the designer.

### UserSchema
- `_id` (string): Unique ID for the user (ObjectId).
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.
- `type` (string): The type of user account (customer or designer).
- `companyName` (string): The name of the company (for designers).
- `companyLogo` (string): URL of the company logo (optional).
- `phone` (number): The phone number of the user.
- `address` (string): The address of the user.
- `city` (string): The city of the user.
- `state` (string): The state of the user.
- `country` (string): The country of the user.
- `pincode` (number): The pincode of the user.
- `category` (string): The category of the designer (e.g., Architect, Interior Designer).
- `description` (string): Description of the designer (optional).
- `website` (string): The website URL of the designer.
- `facebook` (string): The Facebook URL of the designer.
- `instagram` (string): The Instagram URL of the designer.
- `linkedin` (string): The LinkedIn URL of the designer.
- `projects` (array): Array of project IDs associated with the user.
- `reviews` (array): Array of review IDs associated with the user.
- `rating` (number): Rating of the user based on reviews.
- `isVerified` (boolean): Flag indicating if the user is verified.
- `contacts` (array): Array of user IDs who are contacts of the user.

## Error Handling

In case of an error, the API will return a JSON response with the following structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message describing the issue."
  }
}
```

Replace `ERROR_CODE` with the specific error code and `Error message describing the issue.` with a human-readable error message. Possible error codes may include `INVALID_REQUEST`, `USER_NOT_FOUND`, `INVALID_CREDENTIALS`, etc.


**API Documentation for Projects**

This documentation provides details about the Projects API, including its routes, request formats, response formats, and potential exceptions.

### Routes

#### Create a new project
- **Route**: POST /project
- **Description**: Create a new project with the given details.
- **Request Body**:
  ```json
  {
    "designerId": "<designer_id>",
    "name": "<project_name>",
    "address": "<project_address>",
    "year": "<project_year>",
    "cost": <project_cost>,
    "images": ["<image_url1>", "<image_url2>", ...],
    "portfolio": "<portfolio_url>"
  }
  ```
- **Response**: Returns the newly created project object.

#### Get all projects
- **Route**: GET /project
- **Description**: Retrieve a list of all projects.
- **Response**: Returns an array of project objects.

#### Get a project by ID
- **Route**: GET /project/:id
- **Description**: Retrieve a project by its ID.
- **Response**: Returns the project object with the specified ID.
- **Request Parameter**: The `id` parameter is the ObjectId of the project.

#### Update a project
- **Route**: PUT /project/:id
- **Description**: Update a project with the given details.
- **Request Body**:
  ```json
  {
    "designerId": "<designer_id>",
    "name": "<project_name>",
    "address": "<project_address>",
    "year": "<project_year>",
    "cost": <project_cost>,
    "images": ["<image_url1>", "<image_url2>", ...],
    "portfolio": "<portfolio_url>"
  }
  ```
- **Response**: Returns the updated project object.
- **Request Parameter**: The `id` parameter is the ObjectId of the project.

#### Delete a project
- **Route**: DELETE /project/:id
- **Description**: Delete a project by its ID.
- **Response**: Returns the deleted project object.
- **Request Parameter**: The `id` parameter is the ObjectId of the project.

#### Add Contact to a project
- **Route**: POST /project/:id/addContact
- **Description**: Add a contact to a project.
- **Request Body**:
  ```json
  {
    "from": "<contact_id>",
    "message": "<contact_message>"
  }
  ```
- **Response**: Returns the updated project object.
- **Request Parameter**: The `id` parameter is the ObjectId of the project.

### Exceptions

The API may throw the following exceptions:

- **ProjectCreationException**: When an error occurs while creating a project.
- **ProjectNotFoundException**: When a project with the specified ID is not found.
- **ProjectDeletionException**: When an error occurs while deleting a project.
- **ProjectDesignerIdException**: When the designerId provided is not valid.

### Request Example

**Route**: POST /project
**Request Body**:
```json
{
  "designerId": "612534f7f3f5cf1df99e1b5e",
  "name": "Project A",
  "address": "123 Main St, City",
  "year": "2023",
  "cost": 50000,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "portfolio": "https://example.com/portfolio"
}
```

### Response Example

**Response**:
```json
{
  "_id": "613123acd00b1e00254aa75a",
  "designerId": "612534f7f3f5cf1df99e1b5e",
  "name": "Project A",
  "address": "123 Main St, City",
  "year": "2023",
  "cost": 50000,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "portfolio": "https://example.com/portfolio",
  "proposals": []
}
```

### Response Example (Get all projects)

**Response**:
```json
[
  {
    "_id": "613123acd00b1e00254aa75a",
    "designerId": "612534f7f3f5cf1df99e1b5e",
    "name": "Project A",
    "address": "123 Main St, City",
    "year": "2023",
    "cost": 50000,
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "portfolio": "https://example.com/portfolio",
    "proposals": []
  },
  {
    "_id": "613123bcd00b1e00254aa75b",
    "designerId": "612534f7f3f5cf1df99e1b5e",
    "name": "Project B",
    "address": "456 Elm St, Town",
    "year": "2024",
    "cost": 75000,
    "images": ["https://example.com/image3.jpg", "https://example.com/image4.jpg"],
    "portfolio": "https://example.com/portfolio2",
    "proposals": [
      {
        "from": "61312487d00b1e00254aa75c",
        "message": "I'm interested in this project."
      }
    ]
  }
]
```

### Exception Example

**Response** (ProjectNotFoundException):
```json
{
  "statusCode": 404,
  "message": "Project not found"
}
```

**Response** (ProjectDeletionException):
```json
{
  "statusCode": 500,
  "message": "Error deleting project"
}
```

**Response** (ProjectDesignerIdException):
```json
{
  "statusCode": 400,
  "message": "Invalid DesignerId"
}
```