const Event = require("../models/Event"); // Adjust path as needed
const multer = require("multer");
const path = require("path");

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

// Add an Event
async function add(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: "FAILED", message: err.message });
        }

        let { title, price, description, category, organizers, rating, skill_level, event_type, language, popular } = req.body;
        const thumb = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

        // Input sanitization
        title = title?.trim();
        price = parseFloat(price) || 0;
        description = description?.trim();
        category = category?.trim();
        organizers = organizers?.trim();
        rating = rating ? parseFloat(rating) : 0;
        skill_level = skill_level?.trim();
        event_type = event_type?.trim();
        language = language?.trim();
        popular = popular?.trim();

        // Validation
        if (!title) {
            return res.json({ status: "FAILED", message: "Title is required" });
        }
        if (price < 0) {
            return res.json({ status: "FAILED", message: "Price cannot be negative" });
        }

        try {
            const existingEvent = await Event.findOne({ title });
            if (existingEvent) {
                return res.json({ status: "FAILED", message: "Event title already exists" });
            }

            const newEvent = new Event({
                title,
                price,
                description,
                category,
                organizers,
                rating,
                thumb,
                skill_level,
                event_type,
                language,
                popular
            });

            const result = await newEvent.save();
            res.json({ status: "SUCCESS", message: "Event added successfully", data: result });
        } catch (error) {
            res.json({ status: "FAILED", message: error.message });
        }
    });
}

// Get All Events
async function getAll(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json({ status: "SUCCESS", message: "Events fetched successfully", data: events });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Get Event by ID
async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Event ID format" });
        }
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ status: "FAILED", message: "Event not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Event fetched successfully", data: event });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Update an Event
async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Event ID format" });
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEvent) {
            return res.status(404).json({ status: "FAILED", message: "Event not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Event updated successfully", data: updatedEvent });
    } catch (error) {
        res.status(400).json({ status: "FAILED", message: error.message });
    }
}

// Delete an Event
async function deleteEvent(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Event ID format" });
        }
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ status: "FAILED", message: "Event not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

module.exports = {
    add,
    getAll,
    getById,
    update,
    deleteEvent
};