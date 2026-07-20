import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactSchema = z.infer<typeof contactSchema>;
