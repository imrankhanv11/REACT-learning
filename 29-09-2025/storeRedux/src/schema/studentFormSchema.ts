import {z} from "zod";

export const studentFormSchema = z.object({
    name: z.string().trim().min(2, "Name must have at least 2 Charecter"),

    email: z.string().trim().email("Invalid email"),

    category: z.array(z.string()).min(1, "Select atl least one Category"),

    gender: z.enum(["male", "female"]),

    dob: z.date()
    .refine((date) => new Date(date) <= new Date(), "Date can't be in Future"),

    image: z.string().min(1, "Image is required")
})

export type studentFormValues = z.infer<typeof studentFormSchema>;
