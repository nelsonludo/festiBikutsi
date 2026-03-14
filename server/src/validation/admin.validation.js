import { z } from "zod";
export const settingsSchema = z.object({
    festivalDate: z.string().transform((val) => new Date(val)),
});
export const artistUpdateSchema = z.object({
    isApproved: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    name: z.string().optional(),
    stageName: z.string().optional(),
    genre: z
        .enum(["Modern Bikutsi", "Traditional Bikutsi", "Bikutsi Fusion", "Other"])
        .optional(),
    bio: z.string().optional(),
    imageUrl: z.string().optional(),
    epkLink: z.string().url().optional().or(z.literal("")),
});
export const artistCreateSchema = z.object({
    name: z.string(),
    stageName: z.string(),
    genre: z.enum([
        "Modern Bikutsi",
        "Traditional Bikutsi",
        "Bikutsi Fusion",
        "Other",
    ]),
    email: z.string().email(),
    bio: z.string(),
    imageUrl: z.string().optional(),
    epkLink: z.string().url().optional().or(z.literal("")),
    isApproved: z.boolean().default(true),
    isPublished: z.boolean().default(true),
});
export const scheduleSchema = z.object({
    artist: z.string(), // Performer ID
    day: z.number().min(1),
    time: z.string(),
    stage: z.string(),
    type: z.enum(["Performance", "Workshop", "Ceremony", "Other"]),
    isPublished: z.boolean().default(true),
});
export const gallerySchema = z.object({
    title: z.string().optional(),
    type: z.enum(["image", "video"]),
    url: z.string(),
    isPublished: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
});
export const historySchema = z.object({
    year: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
});
//# sourceMappingURL=admin.validation.js.map