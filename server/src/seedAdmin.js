import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Admin } from "./models/admin.model.js";
dotenv.config();
const seedAdmin = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/festibikutsi";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB for seeding");
        const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            console.log("⚠️ Admin already exists. Skipping seed.");
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const admin = new Admin({
            email: ADMIN_EMAIL,
            password: hashedPassword,
        });
        await admin.save();
        console.log("🚀 Admin user seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map