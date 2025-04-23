require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // For session persistence
const cors = require("cors");
const crypto = require("crypto");
const passport = require("./config/passport");
const axios = require("axios");
const { generateZoomMeeting } = require("./zoom.service"); // From collage app.js
const Course = require("./models/Course"); // Import Course model

const config = require("./config/dbconnexion.json");
const path = require("path");


// Database Connection
mongoose
  .connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database not connected:", err));

const UserRoutes = require("./routes/User.js");
const CourseRoutes = require("./routes/Course.js");
const ChatbotRoutes = require("./routes/Chatbot.js"); // From collage app.js
const questionRoutes = require("./routes/Questions.js");
const reponseRoutes = require("./routes/Response.js");
const quizRoutes = require("./routes/Quiz.js");
const scoreQuizRoutes = require("./routes/ScoreQuiz.js");
const EventRoutes = require("./routes/event.js");

const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware with MongoDB store
const secret = process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false, // Only save sessions for authenticated users
    store: MongoStore.create({
      mongoUrl: config.url,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS with credentials support
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "github-token"],
  })
);

// Authentication Routes
// Google OAuth
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/classroom.courses.readonly"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`);
  }
);

// Facebook OAuth
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`);
  }
);

// GitHub OAuth
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`);
  }
);

// LinkedIn OAuth
app.get("/auth/linkedin", passport.authenticate("linkedin", { scope: ["openid", "profile", "email"] }));
app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`);
  }
);

// Get current user
app.get("/auth/current_user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

// Fetch GitHub Repos
app.get("/github/repos", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Please log in to fetch GitHub repos" });
  }

  const githubToken = req.headers["github-token"];
  if (!githubToken) {
    return res.status(400).json({ message: "GitHub token is required" });
  }

  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repos = response.data.map((repo) => ({
      name: repo.name,
      language: repo.language || "Not specified",
    }));

    res.json({ status: "SUCCESS", data: repos });
  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch GitHub repos" });
  }
});

// Fetch Courses by Repo Language
app.get("/github/courses-by-repo-language/:repoName", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Please log in to fetch courses" });
  }

  const { repoName } = req.params;
  const githubToken = req.headers["github-token"];
  if (!githubToken) {
    return res.status(400).json({ message: "GitHub token is required" });
  }

  try {
    const allReposResponse = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repo = allReposResponse.data.find((r) => r.name === repoName);
    if (!repo) {
      return res.status(404).json({ message: `Repository ${repoName} not found` });
    }

    const owner = repo.owner.login;
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const programmingLanguage = response.data.language ? response.data.language.toLowerCase() : null;
    let courses = [];
    if (programmingLanguage) {
      if (programmingLanguage === "javascript") {
        courses = await Course.find({ programmingLanguage: "javascript" });
      } else if (programmingLanguage === "php") {
        courses = await Course.find({ programmingLanguage: "php" });
      } else if (programmingLanguage === "css") {
        courses = await Course.find({ programmingLanguage: "css" });
      } else {
        courses = await Course.find({ programmingLanguage });
      }
    }

    res.status(200).json({ status: "SUCCESS", data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// Zoom Meeting Route (Protected)
app.post("/api/zoom/meeting", passport.authenticate("session"), async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  const { courseId } = req.body;
  try {
    const meetingData = await generateZoomMeeting(courseId);
    res.json({
      join_url: meetingData.join_url,
      meeting_id: meetingData.id,
      password: meetingData.password,
    });
  } catch (error) {
    console.error("Zoom meeting creation error:", error);
    res.status(500).json({ message: "Failed to create Zoom meeting", error: error.message });
  }
});

// Terms page
app.get("/terms", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Conditions de service</h1>
        <p>Ceci est une condition de service temporaire pour les tests. Utilisez cette app de manière responsable.</p>
      </body>
    </html>
  `);
});

// Serve static files from 'uploads' folder
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/user", UserRoutes);
app.use("/course", CourseRoutes);
app.use("/chatbot", ChatbotRoutes);
app.use("/questions", questionRoutes);
app.use("/responses", reponseRoutes);
app.use("/quiz", quizRoutes);
app.use("/scoreQuizzes", scoreQuizRoutes);
app.use("/event", EventRoutes);


// Create HTTP server and start listening
const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
