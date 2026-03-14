import mongoose from "mongoose";
export declare const Performer: mongoose.Model<{
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
}, mongoose.Document<unknown, {}, {
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    name: string;
    stageName: string;
    genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
    bio: string;
    isApproved: boolean;
    isPublished: boolean;
    registrationDate: NativeDate;
    imageUrl?: string | null;
    epkLink?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=performer.model.d.ts.map