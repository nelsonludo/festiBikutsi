import mongoose from "mongoose";
const ScheduleSchema = new mongoose.Schema({
    day: { type: Number, required: true }, // e.g., 1, 2, 3
    time: { type: String, required: true }, // e.g., "18:00"
    artist: { type: String, required: true },
    stage: { type: String, required: true },
    type: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});
export const Schedule = mongoose.model("Schedule", ScheduleSchema);
//# sourceMappingURL=schedule.model.js.map