User Management and Course Retrieval API Documentation
Overview
This API provides comprehensive user management and course retrieval functionalities. It enables:
•	User Management: Registration, login (including facial recognition login), email verification, password reset, OTP verification.
•	Location-Based Course Retrieval: Uses IP-based geolocation to serve courses in a language tailored to the user’s country.
Technology Stack:
•	Backend: Express.js
•	Database: MongoDB (using Mongoose)
•	External API: geo.ipify.org for geolocation
Dependencies: express, axios, dotenv, mongoose, bcrypt, nodemailer, uuid, crypto, ml-distance
Date: March 04, 2025
 
Environment Variables
Store these in your .env file:
•	IPIFY_API_KEY: API key for geo.ipify.org (e.g., at_qOGywmfdTLpJszKtr1Bh5497ToY6N)
•	PORT: Server port (default: 3000)
•	MONGO_URI: MongoDB connection string
•	EMAIL_USER: Gmail address for sending emails
•	EMAIL_PASS: Gmail app password
•	AUTH_EMAIL: Sender email (if different from EMAIL_USER)
•	FRONTEND_URL: Base URL of the frontend app (e.g., http://localhost:3000)
 
Data Models
User Model
Represents a user in the system.
javascript
CopierModifier
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
UserVerification Model
Stores email verification data.
javascript
CopierModifier
const userVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Number,
  expiresAt: Number
});
const UserVerification = mongoose.model('UserVerification', userVerificationSchema);
UserOTPVerification Model
Stores OTP verification data.
javascript
CopierModifier
const userOTPVerificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Number,
  expiresAt: Number
});
const UserOTPVerification = mongoose.model('UserOTPVerification', userOTPVerificationSchema);
Courses Model
Represents educational courses.
javascript
CopierModifier
const courseSchema = new mongoose.Schema({
  title: String,
  language: String, // e.g., "Arabic", "English", "Hindi"
  level: String     // e.g., "Beginner", "Intermediate", "Advanced"
});
const Courses = mongoose.model('Course', courseSchema);
 
API Endpoints
User Management
1.	Register a New User
o	Endpoint: POST /add
o	Description: Registers a new user and sends a verification email.
o	Request Body:
json
CopierModifier
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
o	Responses:
	201: { "status": "PENDING", "message": "Verification email sent" }
	400: { "status": "FAILED", "message": "Email already exists" } or other errors like "Error saving user account!"
2.	Retrieve All Users
o	Endpoint: GET /users
o	Description: Fetches all users.
o	Responses:
	200: Array of user objects.
	500: { "error": "Error message" }
3.	Retrieve a User by ID
o	Endpoint: GET /users/:id
o	Description: Fetches a user using their MongoDB ObjectId.
o	Responses:
	200: User object.
	400: { "error": "Invalid User ID format" }
	404: { "error": "User not found" }
	500: { "error": "Error message" }
4.	Retrieve a User by Name
o	Endpoint: GET /users/name/:name
o	Description: Fetches a user by name.
o	Responses:
	200: User object.
	404: { "error": "User not found" }
	500: { "error": "Error message" }
5.	Update a User
o	Endpoint: PUT /users/:id
o	Description: Updates user details.
o	Request Body: Updated fields.
o	Responses:
	200: { "message": "User updated successfully", "updatedUser": { ... } }
	400: { "error": "Invalid User ID format" } or error messages.
	404: { "error": "User not found" }
6.	Delete a User
o	Endpoint: DELETE /users/:id
o	Description: Deletes a user.
o	Responses:
	200: { "message": "User deleted successfully" }
	400: { "error": "Invalid User ID format" }
	404: { "error": "User not found" }
	500: { "error": "Error message" }
7.	Delete All Users
o	Endpoint: DELETE /users
o	Description: Deletes all users.
o	Responses:
	200: { "message": "X users deleted successfully" }
	500: { "error": "Error message" }
8.	Forgot Password
o	Endpoint: POST /forgot-password
o	Description: Sends a password reset email.
o	Request Body:
json
CopierModifier
{ "email": "john@example.com" }
o	Responses:
	200: "Check your email for reset instructions"
	404: "Email not found"
	500: "Error sending email" or "Server error"
9.	Reset Password
o	Endpoint: POST /reset-password
o	Description: Resets a user’s password using a token.
o	Request Body:
json
CopierModifier
{
  "token": "resetToken",
  "password": "newPass",
  "confirmPassword": "newPass"
}
o	Responses:
	200: "Password updated successfully"
	400: "Passwords do not match"
	404: "Invalid or expired token"
	500: "Server error"
10.	Face Login
o	Endpoint: POST /face-login
o	Description: Logs in a user via facial recognition.
o	Request Body:
json
CopierModifier
{ "facialId": "uniqueFacialId" }
o	Responses:
	200: { "message": "Login successful", "user": { "id": "...", "name": "...", "email": "..." } }
	400: { "message": "Valid Facial ID is required" }
	404: { "message": "No user found with this facial ID" }
	500: { "message": "Server error during login" }
11.	Register Face
o	Endpoint: POST /register-face
o	Description: Registers a user using facial recognition.
o	Request Body:
json
CopierModifier
{ "facialId": "uniqueFacialId", "name": "John", "email": "john@example.com" }
o	Responses:
	200: { "message": "Registration successful", "user": { "id": "...", "name": "...", "email": "..." } }
	400: { "message": "Facial ID, name, and email are required" }
	409: { "message": "This facial ID is already registered" } or { "message": "This email is already registered" }
	500: { "message": "Server error during registration" }
12.	Email Verification
o	Endpoint: GET /user/verify/:userId/:uniqueString
o	Description: Verifies a user’s email.
o	Response: Redirects to ${FRONTEND_URL}/team.
13.	Verified Confirmation Page
o	Endpoint: GET /user/verified
o	Description: Redirects to the verified confirmation page.
o	Response: Redirects to ${FRONTEND_URL}/team.
14.	Send OTP
o	Endpoint: POST /send-otp
o	Description: Sends an OTP for account verification during sign-in.
o	Request Body:
json
CopierModifier
{ "userId": "id", "email": "john@example.com" }
o	Responses:
	200: { "status": "PENDING", "message": "OTP verification email sent successfully", "data": { "userId": "...", "email": "..." } }
	400: { "status": "FAILED", "message": "Error message" }
15.	Verify OTP
o	Endpoint: POST /verify-otp
o	Description: Verifies the provided OTP.
o	Request Body:
json
CopierModifier
{ "userId": "id", "otp": "1234" }
o	Responses:
	200: { "status": "VERIFIED", "message": "Your account has been verified successfully" }
	400: { "status": "FAILED", "message": "Empty otp details are not allowed" } or { "status": "FAILED", "message": "Invalid code passed" } or { "status": "FAILED", "message": "Code has expired" }
16.	Resend OTP
o	Endpoint: POST /resend-otp
o	Description: Resends the OTP for verification.
o	Request Body:
json
CopierModifier
{ "userId": "id", "email": "john@example.com" }
o	Responses:
	200: { "status": "PENDING", "message": "OTP verification email sent successfully" }
	400: { "status": "FAILED", "message": "Empty user details are not allowed" }
17.	User Sign In
o	Endpoint: POST /signin
o	Description: Logs in a user and triggers OTP verification.
o	Request Body:
json
CopierModifier
{ "email": "john@example.com", "password": "password123" }
o	Responses:
	200: { "status": "PENDING", "message": "OTP verification email sent" }
	400: { "status": "FAILED", "message": "Empty credentials supplied!" } or { "status": "FAILED", "message": "Invalid credentials entered!" } or { "status": "FAILED", "message": "Invalid password entered!" }
Location-Based Course Retrieval
18.	Get Courses by Location
o	Endpoint: GET /courses-by-location
o	Description: Retrieves courses based on the user's country.
The API calls the getCountryFromIP utility (which uses geo.ipify.org) to determine the country, then filters courses by language:
	If the country is TN: Returns Arabic courses.
	If the country is US: Returns English courses.
	Otherwise: Returns Hindi courses.
o	Responses:
	200: Array of course objects (e.g., { title, language, level, _id })
	500: { "message": "Error detecting location or fetching courses", "error": "Error message" }
 
Example Usage
Register a User
bash
CopierModifier
curl -X POST http://localhost:3000/add \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Ali",
           "email": "ali@example.com",
           "password": "pass123"
         }'
Retrieve Courses by Location
bash
CopierModifier
curl http://localhost:3000/courses-by-location
•	Expected Outcome:
o	TN: Returns courses in Arabic.
o	US: Returns courses in English.
o	Other: Returns courses in Hindi.
 
Error Handling
•	General:
Each endpoint logs errors to the console and returns a 500 status code with an error message for server or database issues.
•	Endpoint-Specific:
Endpoints provide detailed error responses (e.g., invalid credentials, missing parameters, expired tokens).
 
Additional Notes
•	Frontend Integration:
Routes such as /user/verify and /user/verified redirect to the URL specified by FRONTEND_URL. Ensure your frontend is configured to handle these routes.
•	Security Considerations:
o	Passwords are securely hashed using bcrypt.
o	Use HTTPS in production.
•	Scalability:
Consider adding pagination for endpoints that return large datasets (e.g., /users).

