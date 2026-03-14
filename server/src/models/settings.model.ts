import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    festivalDate: {
      type: Date,
      required: true,
      default: new Date("2026-11-25T00:00:00"),
    },
    // Add other global settings as needed
  },
  { timestamps: true },
);

export const Settings = mongoose.model("Settings", SettingsSchema);
