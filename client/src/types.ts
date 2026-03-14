export interface Artist {
  _id: string;
  name: string;
  stageName: string;
  genre: "Modern Bikutsi" | "Traditional Bikutsi" | "Bikutsi Fusion" | "Other";
  email: string;
  bio: string;
  imageUrl?: string;
  epkLink?: string;
  isApproved: boolean;
  isPublished: boolean;
  registrationDate: string;
}

export interface HistoryItem {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

export interface ScheduleItem {
  _id: string;
  day: number;
  time: string;
  artist: string;
  stage: string;
  type: string;
  isPublished: boolean;
  artistImage?: string | null;
}

export interface GalleryItem {
  _id: string;
  url: string;
  alt: string;
  isPublished: boolean;
  createdAt: string;
}

export interface ServerError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}
