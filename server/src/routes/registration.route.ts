import { Router } from "express";
import { Performer } from "../models/performer.model.js";
import { Schedule } from "../models/schedule.model.js";
import { Gallery } from "../models/gallery.model.js";
import { History } from "../models/history.model.js";
import { upload } from "../middleware/upload.middleware.js";
import mongoose from "mongoose";

const router = Router();

router.post("/artists", upload.single("image"), async (req, res) => {
  try {
    // Check if MongoDB is actually connected before attempting to save
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database connection unavailable.",
        error:
          "MongoDB is not running locally. Please start your local MongoDB service or configure a valid MONGODB_URI in the .env file.",
      });
    }

    const { name, stageName, genre, email, bio, epkLink } = req.body;
    const imageUrl = req.file ? req.file.filename : undefined;

    const newPerformer = new Performer({
      name,
      stageName,
      genre,
      email,
      bio,
      epkLink,
      imageUrl,
      isApproved: false, // Explicitly false for public registration
      isPublished: false,
    });

    await newPerformer.save();
    res.status(201).json({
      message: "Performer registered successfully",
      data: newPerformer,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Error registering performer", error });
  }
});

router.get("/artists", async (req, res) => {
  try {
    const performers = await Performer.find({
      isApproved: true,
      isPublished: true,
    }).sort({ registrationDate: -1 });
    res.json(performers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching performers", error });
  }
});

router.get("/schedule", async (req, res) => {
  try {
    const items = await Schedule.find({ isPublished: true }).sort({
      day: 1,
      time: 1,
    });

    // Fetch all published performers to match images
    const performers = await Performer.find({ isPublished: true });

    // Enrich schedule items with artist images if they match a stageName
    const enrichedItems = items.map((item) => {
      const artistData = performers.find((p) => p.stageName === item.artist);
      return {
        ...item.toObject(),
        artistImage: artistData?.imageUrl || null,
      };
    });

    res.json(enrichedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule", error });
  }
});

router.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery", error });
  }
});

router.get("/history", async (req, res) => {
  try {
    const historyItems = await History.find().sort({ order: 1, year: 1 });
    res.json(historyItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
});

router.get("/settings", async (req, res) => {
  try {
    const settings = await mongoose.model("Settings").findOne();
    res.json(settings || { festivalDate: new Date("2026-11-25T00:00:00") });
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error });
  }
});

export default router;
