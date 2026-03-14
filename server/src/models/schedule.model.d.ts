import mongoose from "mongoose";
export declare const Schedule: mongoose.Model<{
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: string;
    createdAt: NativeDate;
    isPublished: boolean;
    day: number;
    time: string;
    artist: string;
    stage: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=schedule.model.d.ts.map