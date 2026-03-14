import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import registrationRoutes from "./routes/registration.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

const allowedOrigins = [
  "http://localhost:5173", // Local Dev (Vite)
  "https://festibikutsi-festival.onrender.com", // Your Live Frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Required for JWT cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api", registrationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Database Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/festibikutsi";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log(
      "⚠️  The server requires MongoDB to be running at:",
      MONGODB_URI,
    );
    console.log(
      "👉 Please ensure MongoDB is installed and running locally, or provide a MONGODB_URI in a .env file.",
    );
    // Start the server anyway so the user can see the status, but DB ops will fail
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT} (DB disconnected)`);
    });
  });
app.get("/", (req, res) => {
  res.send("Festibikutsi API is running");
});
//# sourceMappingURL=server.js.map
