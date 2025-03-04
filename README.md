
# User Management and Course Retrieval API Documentation

## Overview
This API provides comprehensive user management and course retrieval functionalities. It enables:

- **User Management:** Registration, login (including facial recognition login), email verification, password reset, OTP verification.
- **Location-Based Course Retrieval:** Uses IP-based geolocation to serve courses in a language tailored to the user’s country.

### Technology Stack
- **Backend:** Express.js
- **Database:** MongoDB (using Mongoose)
- **External API:** [geo.ipify.org](https://geo.ipify.org) for geolocation

### Dependencies
- `express`, `axios`, `dotenv`, `mongoose`, `bcrypt`, `nodemailer`, `uuid`, `crypto`, `ml-distance`

### Date
- **March 04, 2025**

---

## Environment Variables
Store these in your `.env` file:

- **IPIFY_API_KEY:** API key for geo.ipify.org (e.g., `at_qOGywmfdTLpJszKtr1Bh5497ToY6N`)
- **PORT:** Server port (default: `3000`)
- **MONGO_URI:** MongoDB connection string
- **EMAIL_USER:** Gmail address for sending emails
- **EMAIL_PASS:** Gmail app password
- **AUTH_EMAIL:** Sender email (if different from `EMAIL_USER`)
- **FRONTEND_URL:** Base URL of the frontend app (e.g., `http://localhost:3000`)

---

## Data Models

### User Model
Represents a user in the system.

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // e.g., "user", "admin"
  creationDate: Date,
  verified: Boolean,
  resetToken: String,
  resetTokenExpiration: Date,
  facialId: String
});
const User = mongoose.model('User', userSchema);
```

### UserVerification Model
Stores email verification data.

```javascript
const userVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Number,
  expiresAt: Number
});
const UserVerification = mongoose.model('UserVerification', userVerificationSchema);
```

### UserOTPVerification Model
Stores OTP verification data.

```javascript
const userOTPVerificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Number,
  expiresAt: Number
});
const UserOTPVerification = mongoose.model('UserOTPVerification', userOTPVerificationSchema);
```

### Courses Model
Represents educational courses.

```javascript
const courseSchema = new mongoose.Schema({
  title: String,
  language: String, // e.g., "Arabic", "English", "Hindi"
  level: String     // e.g., "Beginner", "Intermediate", "Advanced"
});
const Courses = mongoose.model('Course', courseSchema);
```

---

## API Endpoints

### User Management

#### Register a New User
- **Endpoint:** `POST /add`
- **Description:** Registers a new user and sends a verification email.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - **201:** `{ "status": "PENDING", "message": "Verification email sent" }`
  - **400:** `{ "status": "FAILED", "message": "Email already exists" }`

#### Retrieve All Users
- **Endpoint:** `GET /users`
- **Description:** Fetches all users.
- **Responses:**
  - **200:** Array of user objects.
  - **500:** `{ "error": "Error message" }`

#### Retrieve a User by ID
- **Endpoint:** `GET /users/:id`
- **Description:** Fetches a user using their MongoDB ObjectId.
- **Responses:**
  - **200:** User object.
  - **400:** `{ "error": "Invalid User ID format" }`
  - **404:** `{ "error": "User not found" }`

#### Update a User
- **Endpoint:** `PUT /users/:id`
- **Description:** Updates user details.
- **Request Body:** Updated fields.
- **Responses:**
  - **200:** `{ "message": "User updated successfully", "updatedUser": { ... } }`
  - **400:** `{ "error": "Invalid User ID format" }`

#### Delete a User
- **Endpoint:** `DELETE /users/:id`
- **Description:** Deletes a user.
- **Responses:**
  - **200:** `{ "message": "User deleted successfully" }`
  - **400:** `{ "error": "Invalid User ID format" }`
  - **404:** `{ "error": "User not found" }`

#### Forgot Password
- **Endpoint:** `POST /forgot-password`
- **Description:** Sends a password reset email.
- **Request Body:**
  ```json
  { "email": "john@example.com" }
  ```
- **Responses:**
  - **200:** `"Check your email for reset instructions"`
  - **404:** `"Email not found"`

---

### Authentication & Verification

#### Email Verification
- **Endpoint:** `GET /user/verify/:userId/:uniqueString`
- **Description:** Verifies a user’s email.
- **Response:** Redirects to `${FRONTEND_URL}/team`.

#### OTP Verification
- **Endpoint:** `POST /verify-otp`
- **Description:** Verifies the provided OTP.
- **Request Body:**
  ```json
  { "userId": "id", "otp": "1234" }
  ```
- **Responses:**
  - **200:** `{ "status": "VERIFIED", "message": "Your account has been verified successfully" }`
  - **400:** `{ "status": "FAILED", "message": "Invalid code" }`

---

### Location-Based Course Retrieval

#### Get Courses by Location
- **Endpoint:** `GET /courses-by-location`
- **Description:** Retrieves courses based on the user's country.  
  The API determines the country using geo.ipify.org and filters courses by language:
  - **TN:** Returns **Arabic** courses.
  - **US:** Returns **English** courses.
  - **Other:** Returns **Hindi** courses.

- **Responses:**
  - **200:** Array of course objects.
  - **500:** `{ "message": "Error detecting location or fetching courses" }`

---

## Example Usage

### Register a User
```bash
curl -X POST http://localhost:3000/add \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Ali",
           "email": "ali@example.com",
           "password": "pass123"
         }'
```

### Retrieve Courses by Location
```bash
curl http://localhost:3000/courses-by-location
```

- **Expected Outcome:**
  - **TN:** Returns courses in Arabic.
  - **US:** Returns courses in English.
  - **Other:** Returns courses in Hindi.

---

## Error Handling
- **General:**  
  Each endpoint logs errors to the console and returns a `500` status code with an error message for server or database issues.
- **Endpoint-Specific:**  
  Endpoints provide detailed error responses (e.g., invalid credentials, missing parameters, expired tokens).

---

## Security Considerations
- Passwords are securely hashed using bcrypt.
- Use HTTPS in production.
- Store sensitive data in environment variables.

