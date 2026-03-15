import multer from "multer";
import type { FileFilterCallback } from "multer";
import path from "path";
import type { Request } from "express";

import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, file) => {
    return {
      folder: "festi_bikutsi",
      format: file.mimetype.split("/")[1], // Extract format from mimetype
      resource_type: "auto", // Automatically determine if it's an image or video
    };
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedFileTypes = /jpeg|jpg|png|webp|mp4|mov|avi|wmv/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Only images (jpeg, jpg, png, webp) and videos (mp4, mov, avi, wmv) are allowed!",
    ),
  );
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});
