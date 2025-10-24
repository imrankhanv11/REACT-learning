import z from "zod";

export const addBookSchema = z.object({
    title: z.string()
        .trim()
        .min(3, "Minimum 3 Letter Required"),
    
    author: z.string()
    .trim()
    .min(3, "Minimum 3 Letter Required"),

    price: z.number().min(1, "Minimum Amount Required"),

    stock: z.number().min(1, "Minimum Required One stock"),

    categoryId: z.number()
});

export type addBookSchemaValues = z.infer<typeof addBookSchema>;