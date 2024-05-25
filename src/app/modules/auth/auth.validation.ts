import {z} from "zod";

const loginZodSchema = z.object({
  body: z
    .object({
      username: z.string().optional(),
      email: z.string().optional(),
      password: z.string({
        required_error: "Password is required",
      }),
    })
    .refine((data) => data.username || data.email, {
      message: "Either username or email is required",
      path: ["body", "username"],
    }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Old password  is required",
    }),
    newPassword: z.string({
      required_error: "New password  is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
