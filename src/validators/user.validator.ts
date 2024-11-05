import { z } from "zod";

export const UserSchema = z.object({
  user_id: z.number().optional(),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email format"),
  password_hash: z.string().trim().min(8, "Password must be at least 8 characters"),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type UserSchemaType=z.infer<typeof UserSchema>