import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const specificUserSchema = z.object({
  id: z.string(),
});

export const createSubscriptionSchema = z.object({
  name: z.string(),
  price: z.number(),
  currency: z.enum(["USD", "EUR", "GBP"]).optional(),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  category: z.enum([
    "sports",
    "news",
    "entertainment",
    "lifestyle",
    "finance",
    "technology",
    "politics",
    "other",
  ]),
  paymentMethod: z.string(),
  status: z.enum(["active", "canceled", "expired"]).optional(),
  startDate: z.string(),
  renewalDate: z.string().optional(),
});
