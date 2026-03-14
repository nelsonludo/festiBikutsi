export interface Artist {
  _id: string;
  name: string;
  stageName: string;
  genre: string;
  email: string;
  bio: string;
  imageUrl?: string;
  epkLink?: string;
  isApproved: boolean;
  isPublished: boolean;
  registrationDate: string;
}

export interface ScheduleItem {
  _id: string;
  day: number;
  time: string;
  artist: string;
  stage: string;
  type: string;
  description?: string;
  artistImage?: string | null;
  isPublished: boolean;
}

export interface GalleryImage {
  type: string;
  title: string | undefined;
  isFeatured: boolean;
  _id: string;
  url: string;
  alt?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface Admin {
  _id: string;
  email: string;
}
