import {z} from "zod";

const createUser = z.object({
  body: z.object({
    password: z.string(),
    user: z.object({
      email: z.string().email(),
      username: z.string(),
    }),
  }),
});
const updateUser = z.object({
  body: z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum(["PENDING", "ACTIVE", "BLOCKED"]),
  }),
});

export const UserValidation = {
  createUser,
  createAdmin,

  updateStatus,
};
