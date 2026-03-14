import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Gallery = mongoose.model("Gallery", GallerySchema);
