import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({ message: "Logged in successfully", email: admin.email });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});

// Admin Logout
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Logged out successfully" });
});

// Get current admin
router.get("/me", authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin profile", error });
  }
});

export default router;
