import {z} from "zod";

const tripCreate = z.object({
  body: z.object({
    destination: z.string().min(1, {message: "Destination is required"}),
    description: z.string().min(1, {message: "Description is required"}),
    travelDates: z.array(z.string().transform((str) => new Date(str))),
    travelType: z.enum(["ADVENTURE", "LEISURE", "BUSINESS"]),
    photos: z.array(z.string().url()),
  }),
});

export const TripValidation = {
  tripCreate,
};
