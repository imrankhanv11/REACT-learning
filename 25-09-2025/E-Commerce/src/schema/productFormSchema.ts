import { z } from "zod"

export const schema = z.object({
    name: z.string()
        .trim()
        .min(3, "Minimum three Char required"),
    type: z.enum(["Own", "3rdParty"], { message: "Select at type" }),
    categories: z.array(z.string()).min(1, "Select at least one Category"),
    stock: z.number()
        .min(1, "Minimum 1 stock required"),
    addedDate: z.date()
        .nullable()
        .refine((data) => data !== null, "Date is required")
        .refine((data) => data !== null ? data <= new Date() : false, "addDate can't be future"),
});