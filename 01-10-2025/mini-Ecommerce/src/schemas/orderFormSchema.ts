import { z } from "zod";

export const orderFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters"),

    phone: z
        .string()
        .trim()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    address: z
        .string()
        .trim()
        .min(10, "Address must be at least 10 characters")
        .max(200, "Address is too long"),

    city: z
        .string()
        .trim()
        .min(2, "City must be at least 2 characters"),

    state: z
        .string()
        .trim()
        .min(2, "State must be at least 2 characters"),

    zip: z
        .string()
        .trim()
        .regex(/^[0-9]{5,6}$/, "ZIP code must be 5 or 6 digits"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
