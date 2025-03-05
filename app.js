require('dotenv').config();
const express = require("express");
const mongo = require("mongoose");
const http = require("http");
const session = require("express-session"); 
const cors = require("cors");
const crypto = require("crypto");
const passport = require("./config/passport"); 


const config = require("./config/dbconnexion.json");

mongo
  .connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database not connected"));



const UserRoutes = require("./routes/User.js");
const courseRoutes = require('./routes/Course.js');



const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware (if required for your forgot/reset functionality)
const secret = crypto.randomBytes(64).toString("hex");
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Passport Initialization jdidaaa 
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for all routes jdidaaaa
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  // origin:  "http://localhost:5173",
  credentials: true, // Allow cookies/sessions
}));




// jdiidaaa

// Authentication Routes  
// Google OAuth  
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`); // Will use port 5001 from .env
  }
);

// Facebook OAuth
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/courses`); // Will use port 5001 from .env
  }
);

// Optional: Get current user
app.get('/auth/current_user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});






app.get('/terms', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Conditions de service</h1>
        <p>Ceci est une condition de service temporaire pour les tests. Utilisez cette app de manière responsable.</p>
      </body>
    </html>
  `);
});




// toufaa hne 

// Serve static files from 'uploads' folder
app.use('/uploads', express.static('uploads'));
// User routes
app.use("/user", UserRoutes);
// Course routes
app.use('/course', courseRoutes);

// Create HTTP server and start listening
const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
