import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const History = mongoose.model("History", HistorySchema);
