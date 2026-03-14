import mongoose from "mongoose";
export declare const Gallery: mongoose.Model<{
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: "image" | "video";
    isPublished: boolean;
    url: string;
    isFeatured: boolean;
    title?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=gallery.model.d.ts.map