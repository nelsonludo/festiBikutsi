import mongoose from "mongoose";
const PerformerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stageName: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: ["Modern Bikutsi", "Traditional Bikutsi", "Bikutsi Fusion", "Other"],
    },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    imageUrl: { type: String },
    epkLink: { type: String },
    isApproved: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    registrationDate: { type: Date, default: Date.now },
});
export const Performer = mongoose.model("Performer", PerformerSchema);
//# sourceMappingURL=performer.model.js.map