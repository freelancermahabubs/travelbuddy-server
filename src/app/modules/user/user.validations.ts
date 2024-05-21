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

const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
  }),
});

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
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
  createPatient,
  updateStatus,
};
