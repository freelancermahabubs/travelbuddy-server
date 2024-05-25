import { TravelType } from "@prisma/client";

export type ITripFilterRequest = {
  searchTerm?: string | undefined;
  destination?: string | undefined;
  travelType?: string | undefined;
  travelDates?: Date | undefined;
};

export type ITrip = {
    id: string;
    destination: string;
    description: string;
    travelDates: Date[];
    travelType: TravelType;
    photos: string[];
    userId: string;
    createdAt: Date,
    updatedAt: Date,
  }
  