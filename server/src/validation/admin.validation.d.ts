import { z } from "zod";
export declare const settingsSchema: z.ZodObject<{
    festivalDate: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
}, z.core.$strip>;
export declare const artistUpdateSchema: z.ZodObject<{
    isApproved: z.ZodOptional<z.ZodBoolean>;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodOptional<z.ZodString>;
    stageName: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodEnum<{
        "Modern Bikutsi": "Modern Bikutsi";
        "Traditional Bikutsi": "Traditional Bikutsi";
        "Bikutsi Fusion": "Bikutsi Fusion";
        Other: "Other";
    }>>;
    bio: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    epkLink: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export declare const artistCreateSchema: z.ZodObject<{
    name: z.ZodString;
    stageName: z.ZodString;
    genre: z.ZodEnum<{
        "Modern Bikutsi": "Modern Bikutsi";
        "Traditional Bikutsi": "Traditional Bikutsi";
        "Bikutsi Fusion": "Bikutsi Fusion";
        Other: "Other";
    }>;
    email: z.ZodString;
    bio: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodString>;
    epkLink: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    isApproved: z.ZodDefault<z.ZodBoolean>;
    isPublished: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const scheduleSchema: z.ZodObject<{
    artist: z.ZodString;
    day: z.ZodNumber;
    time: z.ZodString;
    stage: z.ZodString;
    type: z.ZodEnum<{
        Other: "Other";
        Performance: "Performance";
        Workshop: "Workshop";
        Ceremony: "Ceremony";
    }>;
    isPublished: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const gallerySchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        image: "image";
        video: "video";
    }>;
    url: z.ZodString;
    isPublished: z.ZodDefault<z.ZodBoolean>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const historySchema: z.ZodObject<{
    year: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    order: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=admin.validation.d.ts.map