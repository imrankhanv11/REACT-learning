import { z } from "zod"

export const studentFormSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Name required 3 Char"),

    email: z.string()
        .email("Invalid Email"),

    age: z.number()
        .min(6, "Age must be above 5"),


    dateOfBirth: z
        .date()
        .nullable()
        .refine((date) => date !== null, "Date of Birth is Required")
        .refine((date) => date !== null ? date <= new Date() : false, "Date of Birth cannot be in the future"),

    enrollmentDate: z
        .date()
        .nullable()
        .optional(),

    course: z.string()
        .min(1, "Please select one Course"),

    phoneNumber: z.string()
        .trim()
        .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

    status: z.enum(["Active", "Inactive"], { message: "Please select Status" }),

    photoUrl: z.string()
        .min(1, "Photo is required"),
})

