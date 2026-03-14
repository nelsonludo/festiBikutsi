import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.middleware.js";
import { Performer } from "../models/performer.model.js";
import { Schedule } from "../models/schedule.model.js";
import { Gallery } from "../models/gallery.model.js";
import { History } from "../models/history.model.js";
import { Settings } from "../models/settings.model.js";
import { upload } from "../middleware/upload.middleware.js";
import { settingsSchema, artistUpdateSchema, artistCreateSchema, scheduleSchema, gallerySchema, historySchema, } from "../validation/admin.validation.js";
const router = Router();
// Protect all admin routes
router.use(authenticateAdmin);
// Settings Management
router.get("/settings", async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({});
            await settings.save();
        }
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching settings", error });
    }
});
router.patch("/settings", async (req, res) => {
    try {
        const validatedData = settingsSchema.parse(req.body);
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings(validatedData);
        }
        else {
            settings.festivalDate = validatedData.festivalDate;
        }
        await settings.save();
        res.json(settings);
    }
    catch (err) {
        const error = err;
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error updating settings", error });
    }
});
// Artist Management
router.get("/artists", async (req, res) => {
    try {
        const artists = await Performer.find().sort({ registrationDate: -1 });
        res.json(artists);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error fetching artists", error });
    }
});
router.get("/artists/stats", async (req, res) => {
    try {
        const total = await Performer.countDocuments();
        const approved = await Performer.countDocuments({ isApproved: true });
        res.json({ total, approved });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error fetching artist stats", error });
    }
});
router.post("/artists", upload.single("image"), async (req, res) => {
    try {
        const data = {
            ...req.body,
            isApproved: req.body.isApproved === "true" || req.body.isApproved === true,
            isPublished: req.body.isPublished === "true" || req.body.isPublished === true,
        };
        const validatedData = artistCreateSchema.parse(data);
        if (req.file) {
            validatedData.imageUrl = `/uploads/${req.file.filename}`;
        }
        const artist = new Performer(validatedData);
        await artist.save();
        res.status(201).json(artist);
    }
    catch (err) {
        const error = err;
        console.error("Artist Creation Error:", error);
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error creating artist", error });
    }
});
router.patch("/artists/:id", async (req, res) => {
    try {
        const validatedData = artistUpdateSchema.parse(req.body);
        const artist = await Performer.findByIdAndUpdate(req.params.id, validatedData, {
            new: true,
        });
        if (!artist)
            return res.status(404).json({ message: "Artist not found" });
        res.json(artist);
    }
    catch (err) {
        const error = err;
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error updating artist", error });
    }
});
router.delete("/artists/:id", async (req, res) => {
    try {
        const artist = await Performer.findByIdAndDelete(req.params.id);
        if (!artist)
            return res.status(404).json({ message: "Artist not found" });
        res.json({ message: "Artist deleted successfully" });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error deleting artist", error });
    }
});
// Schedule Management
router.get("/schedule", async (req, res) => {
    try {
        const schedule = await Schedule.find()
            .populate("artist")
            .sort({ day: 1, time: 1 });
        res.json(schedule);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error fetching schedule", error });
    }
});
router.post("/schedule", async (req, res) => {
    try {
        const validatedData = scheduleSchema.parse(req.body);
        // Conflict detection: Artist booked twice at same day/time
        const artistConflict = await Schedule.findOne({
            artist: validatedData.artist,
            day: validatedData.day,
            time: validatedData.time,
        });
        if (artistConflict) {
            return res
                .status(400)
                .json({ message: "Artist already scheduled for this time slot" });
        }
        // Conflict detection: Stage double-booked
        const stageConflict = await Schedule.findOne({
            day: validatedData.day,
            time: validatedData.time,
            stage: validatedData.stage,
        });
        if (stageConflict) {
            return res
                .status(400)
                .json({ message: "Stage already booked for this time slot" });
        }
        const item = new Schedule(validatedData);
        await item.save();
        res.status(201).json(item);
    }
    catch (err) {
        const error = err;
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error creating schedule item", error });
    }
});
router.patch("/schedule/:id", async (req, res) => {
    try {
        const validatedData = scheduleSchema.partial().parse(req.body);
        const item = await Schedule.findByIdAndUpdate(req.params.id, validatedData, {
            new: true,
        });
        if (!item)
            return res.status(404).json({ message: "Schedule item not found" });
        res.json(item);
    }
    catch (err) {
        const error = err;
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error updating schedule item", error });
    }
});
router.delete("/schedule/:id", async (req, res) => {
    try {
        const item = await Schedule.findByIdAndDelete(req.params.id);
        if (!item)
            return res.status(404).json({ message: "Schedule item not found" });
        res.json({ message: "Schedule item deleted successfully" });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error deleting schedule item", error });
    }
});
// Gallery Management
router.get("/gallery", async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error fetching gallery", error });
    }
});
router.post("/gallery/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Use schema for validation and defaults (isPublished defaults to true)
        const validatedData = gallerySchema.parse({
            ...req.body,
            url: req.file.filename, // Store only the filename
            type: req.body.type ||
                (req.file.mimetype.startsWith("video") ? "video" : "image"),
        });
        const galleryItem = new Gallery(validatedData);
        await galleryItem.save();
        res.status(201).json(galleryItem);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: "Error uploading gallery item", error });
    }
});
router.patch("/gallery/:id", async (req, res) => {
    try {
        const validatedData = gallerySchema.partial().parse(req.body);
        const image = await Gallery.findByIdAndUpdate(req.params.id, validatedData, {
            new: true,
        });
        if (!image)
            return res.status(404).json({ message: "Image not found" });
        res.json(image);
    }
    catch (err) {
        const error = err;
        if (error.name === "ZodError") {
            return res
                .status(400)
                .json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error updating gallery image", error });
    }
});
router.delete("/gallery/:id", async (req, res) => {
    try {
        const image = await Gallery.findByIdAndDelete(req.params.id);
        if (!image)
            return res.status(404).json({ message: "Image not found" });
        // Note: We could also delete the physical file here
        res.json({ message: "Image deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting gallery image", error });
    }
});
// History Management
router.get("/history", async (req, res) => {
    try {
        const historyItems = await History.find().sort({ order: 1, year: 1 });
        res.json(historyItems);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching history items", error });
    }
});
router.post("/history", async (req, res) => {
    try {
        const validatedData = historySchema.parse(req.body);
        const historyItem = new History(validatedData);
        await historyItem.save();
        res.status(201).json(historyItem);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating history item", error });
    }
});
router.patch("/history/:id", async (req, res) => {
    try {
        const historyItem = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(historyItem);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating history item", error });
    }
});
router.delete("/history/:id", async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id);
        res.json({ message: "History item deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting history item", error });
    }
});
export default router;
//# sourceMappingURL=admin.route.js.map