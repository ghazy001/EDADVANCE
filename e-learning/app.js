const express = require("express");
const app = express(); 
const mongo = require("mongoose");
const bodyparser = require("body-parser");
const http = require("http");
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");

const moduleRoutes = require("./routes/ModuleRoutes");
const chapterRoutes = require("./routes/ChapterRoutes");
const coursRoutes = require("./routes/CoursRoutes");
const evaluationRoutes = require("./routes/EvaluationRoutes");
const userRoutes = require("./routes/UserRoutes");
const reclamationRoutes = require("./routes/ReclamationRoutes");
const gamificationRoutes = require("./routes/GamificationRoutes");
const taskRoutes = require('./routes/TaskRoutes');
const quizRoutes = require('./routes/QuizRoutes');

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const secret = crypto.randomBytes(64).toString("hex");
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use("/modules", moduleRoutes);
app.use("/chapters", chapterRoutes);
app.use("/cours", coursRoutes);
app.use("/evaluation", evaluationRoutes);
app.use("/user", userRoutes);
app.use("/reclamation", reclamationRoutes);
app.use("/gamification", gamificationRoutes);
app.use('/tasks', taskRoutes);
app.use('/quiz', quizRoutes);


const config = require("./config/dbconnexion.json");
mongo.connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log("Database connected"))
.catch(() => console.log("Database not connected"));


const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
