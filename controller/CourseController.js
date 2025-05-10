require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const { google } = require("googleapis");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User"); // Adjust path as needed

// Twilio Client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage }).single("thumb");

// Add a Course
async function add(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: "FAILED", message: err.message });
        }

        let { title, price, description, category, instructors, rating, skill_level, price_type, language, popular } = req.body;
        const thumb = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

        title = title?.trim();
        price = parseFloat(price);
        description = description?.trim();
        category = category?.trim();
        instructors = instructors?.trim();
        rating = rating ? parseFloat(rating) : 0;
        skill_level = skill_level?.trim();
        price_type = price_type?.trim();
        language = language?.trim();
        popular = popular?.trim();

        if (price < 0) {
            return res.json({ status: "FAILED", message: "Price cannot be negative!" });
        }

        try {
            const existingCourse = await Course.findOne({ title });
            if (existingCourse) {
                return res.json({ status: "FAILED", message: "Course title already exists" });
            }

            const newCourse = new Course({
                title, price, description, category, instructors, rating, thumb, skill_level, price_type, language, popular
            });

            const result = await newCourse.save();
            res.json({ status: "SUCCESS", message: "Course added successfully", data: result });
        } catch (error) {
            res.json({ status: "FAILED", message: error.message });
        }
    });
}

// Get All Courses
async function getAll(req, res) {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Course by ID
async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a Course
async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCourse) return res.status(404).json({ error: "Course not found" });
        res.status(200).json({ message: "Course updated successfully", updatedCourse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a Course
async function deleteCourse(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ error: "Course not found" });
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create Checkout Session with Stripe
async function createCheckout(req, res) {
    try {
        const { courses } = req.body;
        if (!courses || courses.length === 0) {
            return res.json({ status: "FAILED", message: "No courses selected for checkout" });
        }

        const line_items = courses.map((course) => ({
            price_data: {
                currency: "usd",
                product_data: { name: course.title, description: course.desc || course.description },
                unit_amount: Math.round(course.price * 100),
            },
            quantity: course.quantity || 1,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            shipping_address_collection: { allowed_countries: ["US", "BR"] },
            success_url: `${process.env.BASE_URL}/course/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/course/cancel`,
        });

        res.json({ status: "SUCCESS", url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Complete Payment and Send SMS
async function completePayment(req, res) {
    try {
        const [session, lineItems] = await Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ["payment_intent.payment_method"] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id),
        ]);

        if (session.payment_status === "paid") {
            const userPhoneNumber = "+21699516931"; // Replace with dynamic user phone if available

            await twilioClient.messages.create({
                body: `Votre paiement de ${session.amount_total / 100} ${session.currency.toUpperCase()} a été effectué avec succès.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: userPhoneNumber,
            });

            res.json({
                status: "SUCCESS",
                message: "Paiement réussi. Un SMS de confirmation a été envoyé.",
                data: { session, lineItems },
            });
        } else {
            res.json({ status: "FAILED", message: "Le paiement n'a pas été effectué." });
        }
    } catch (error) {
        console.error("Payment completion error:", error);
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Cancel Payment
async function cancelPayment(req, res) {
    res.json({ status: "CANCELLED", message: "Payment cancelled" });
}

// Add a Lesson to a Course
async function addLesson(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: "FAILED", message: err.message });
        }

        const { courseId, title, videoUrl, duration, isLocked, order } = req.body;
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

        if (!courseId || !title || !order) {
            return res.json({ status: "FAILED", message: "Required fields (courseId, title, order) are missing!" });
        }

        try {
            const newLesson = new Lesson({
                courseId,
                title,
                videoUrl: videoUrl || "",
                duration: duration || "00:00",
                isLocked: isLocked !== undefined ? isLocked : true,
                order: parseInt(order),
                thumbnail,
            });

            const savedLesson = await newLesson.save();
            res.json({ status: "SUCCESS", message: "Lesson added successfully", data: savedLesson });
        } catch (error) {
            res.json({ status: "FAILED", message: error.message });
        }
    });
}

// Get All Lessons for a Course
async function getLessonsByCourseId(req, res) {
    try {
        const { courseId } = req.params;
        if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }
        const lessons = await Lesson.find({ courseId }).sort({ order: 1 });
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Country from IP
async function getCountryFromIP() {
    try {
        const apiKey = process.env.IPIFY_API_KEY;
        const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data;
        return { ip: data.ip, country: data.location.country };
    } catch (error) {
        console.error("Error fetching IP location:", error.message);
        throw new Error("Failed to detect location");
    }
}

// Get Courses by Location
async function getCourseByLocation(req, res) {
    try {
        const locationData = await getCountryFromIP();
        const country = locationData.country;

        let courses;
        if (country === "TN") {
            courses = await Course.find({ language: "Arabic" });
        } else if (country === "US") {
            courses = await Course.find({ language: "English" });
        } else {
            courses = await Course.find({ language: "French" }); // Default case
        }
        res.status(200).json(courses);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ message: "Error detecting location or fetching courses", error: err.message });
    }
}

// Fetch Google Classroom Courses with YouTube Recommendations
const fetchClassroomCourses = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ status: "FAILED", message: "Not authenticated" });
        }

        const user = await User.findById(req.user.id);
        if (!user.googleAccessToken) {
            return res.status(403).json({ status: "FAILED", message: "No Google access token found. Please re-authenticate with Google." });
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CALLBACK_URL
        );
        oauth2Client.setCredentials({ access_token: user.googleAccessToken });

        const classroom = google.classroom({ version: "v1", auth: oauth2Client });
        let response;
        try {
            response = await classroom.courses.list({ pageSize: 100 });
        } catch (apiError) {
            if (apiError.code === 401 && user.googleRefreshToken) {
                const { credentials } = await oauth2Client.refreshAccessToken();
                user.googleAccessToken = credentials.access_token;
                await user.save();
                oauth2Client.setCredentials({ access_token: user.googleAccessToken });
                response = await classroom.courses.list({ pageSize: 100 });
            } else {
                throw apiError;
            }
        }

        const courses = response.data.courses || [];
        const youtube = google.youtube({ version: "v3", auth: process.env.YOUTUBE_API_KEY });

        const courseList = await Promise.all(
            courses.map(async (course) => {
                const youtubeResponse = await youtube.search.list({
                    part: "snippet",
                    q: `${course.name}`,
                    maxResults: 3,
                    type: "video",
                });

                const recommendations = youtubeResponse.data.items.map((item) => ({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
                }));

                return {
                    id: course.id,
                    name: course.name,
                    section: course.section,
                    description: course.descriptionHeading || "No description",
                    state: course.courseState,
                    recommendations,
                };
            })
        );

        res.json({ status: "SUCCESS", message: "Courses fetched successfully", courses: courseList });
    } catch (error) {
        console.error("Error fetching Classroom courses or YouTube recommendations:", error);
        if (error.code === 401) {
            return res.status(401).json({ status: "FAILED", message: "Google token expired. Please re-authenticate." });
        }
        res.status(500).json({ status: "FAILED", message: "Error fetching courses or recommendations" });
    }
};

module.exports = {
    add,
    getAll,
    getById,
    update,
    deleteCourse,
    createCheckout,
    completePayment,
    cancelPayment,
    addLesson,
    getLessonsByCourseId,
    getCourseByLocation,
    fetchClassroomCourses,
};