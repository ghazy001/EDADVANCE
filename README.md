# 🎓 SkillGro – Smart LMS Integrator

**SkillGro** is an intelligent academic platform developed as part of the **Integrated Project 2025** at [Esprit School of Engineering](https://www.linkedin.com/school/esprit-school-of-engineering/). It bridges the gap between traditional LMS systems by centralizing student data, enhancing engagement, and delivering personalized learning experiences powered by machine learning and predictive analytics.

---

## 🌐 Overview

Today’s learning management systems like **Google Classroom** and **GitHub Classroom** often operate independently, limiting the potential for holistic student tracking and engagement. **SkillGro** addresses this gap by:

- Aggregating academic data from multiple platforms
- Tracking and visualizing student performance
- Delivering AI-based content and assessment recommendations
- Boosting student motivation through gamification
- Predicting academic outcomes using data-driven insights

This project was collaboratively developed by engineering students to showcase applied skills in full-stack development, AI, and educational innovation. It also integrates advanced métiers such as:

- 🧩 **Business Intelligence & Data Analytics** – To build dashboards and decision-making tools
- 🛡️ **Cybersecurity** – Ensuring secure access, data privacy and role-based authorization
- 🧪 **Software Testing & QA** – Automated and manual testing, unit and integration tests
- 🏗️ **DevOps & CI/CD** – Containerization with Docker, CI pipelines with GitHub Actions
- 🧠 **AI Engineering** – Developing, training and optimizing ML models for predictions and recommendations

---

## ✨ Features

- 🔐 **User Management** — Role-based access for Admins, Students, and Instructors
- 📚 **LMS Integration** — Connects with Google Classroom and GitHub
- 🎮 **Gamification Engine** — Includes badges, leaderboards, and XP-based progression
- 🧠 **AI-Based Recommendation System** — Suggests personalized learning resources
- 📈 **Predictive Analytics Dashboard** — Early alerts and success prediction models
- 🔔 **Event Management & Notifications** — Reminders, updates, and deadlines
- ♿ **Accessibility-Compliant UI** — Follows WCAG 2.1 standards for inclusivity

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js (with Hooks & Context API)
- Tailwind CSS
- Axios for API requests
- React Router
- Chart.js / Recharts (for dashboards)

### 🧪 Backend
- Express.js
- RESTful APIs
- JWT Authentication & Role Management
- Validation with Joi

### 📊 AI & Analytics
- Python (scikit-learn, pandas, NumPy)
- Clustering models (K-Means) for learning styles
- Regression models for grade prediction
- Jupyter Notebooks for training/visualization

### 🧾 Database
- MongoDB (Mongoose ODM)
- Data models for users, courses, events, badges

### 🌐 Hosting & Dev Tools
- GitHub (public repo)
- GitHub Education (Heroku, DigitalOcean)
- Docker (for containerization)
- Postman (API testing)
- Figma (UI/UX prototyping)
- GitHub Actions (CI/CD)

---

## 🗂️ Directory Structure

```bash
SkillGro/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       └── styles/
├── ml/
│   ├── clustering_model.py
│   ├── grade_predictor.py
│   └── notebooks/
├── docs/
│   ├── architecture.png
│   ├── demo.gif
│   └── README_assets/
└── README.md
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Python 3.9+
- Git
- Heroku CLI / Docker (optional)

### 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourTeam/SkillGro.git
   ```

2. **Backend setup**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Train AI models (optional)**:
   ```bash
   cd ml
   python grade_predictor.py
   ```

---

## 📸 Demo Screenshots

| Login Page | Dashboard | Recommendation Engine |
|------------|-----------|------------------------|
| ![](docs/README_assets/login.png) | ![](docs/README_assets/dashboard.png) | ![](docs/README_assets/recommendations.png) |

---

## 📢 Acknowledgments

This project was completed under the supervision of our academic mentor **[@Asma Ayarii](https://www.linkedin.com/in/asma-ayarii/)** as part of the final-year integrated project at **Esprit School of Engineering**.

Special thanks to our team: **[@Nom1]**, **[@Nom2]**, **[@Nom3]**, **[@Nom4]**.

We also leveraged the **GitHub Education Pack** to access tools like Heroku and DigitalOcean for hosting and deployment.

---

## 🔖 Topics

> `education-technology` `lms` `esprit` `learning-analytics` `gamification` `ai` `github-classroom` `nodejs` `reactjs` `python` `business-intelligence` `cybersecurity` `devops`

---

## 📣 Follow Us

- 🔗 [Esprit on LinkedIn](https://www.linkedin.com/school/esprit-school-of-engineering/)
- 📨 Contact us via issues or LinkedIn for feedback and collaboration opportunities

---
