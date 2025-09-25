import {z} from "zod"

export const schema = z.object({
    name: z.string().min(3, "Min 3 Char required"),
    email: z.string().email("Invalid Email"),
    gender: z.enum(["Male", "Female"], { message: "Select Gender" }),
    categories: z.array(z.string()).min(1, "Select at least one Category"),
    mobile: z
        .string()
        .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    birthDate: z
        .date()
        .nullable()
        .refine((date) => date !== null, "Date is required")
        .refine((date) => date !== null ? date <= new Date() : false, "Birth date cannot be in the future"),
    country: z.string().min(1, "Please select a country"),
    rating: z
        .number("Rating must be a number")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),


    duration: z
        .tuple([z.date().nullable(), z.date().nullable()])
        .refine(([start, end]) => start !== null && end !== null, {
            message: "Duration is required"
        })
        .refine(([start, end]) => start !== null && end !== null && start <= end, {
            message: "Start date must be before end date"
        })

})
