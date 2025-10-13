import {z} from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, "Name is required and must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z
    .number()
    .positive("Price must be greater than 0"),
  stock: z
    .number()
    .int()
    .nonnegative("Stock cannot be negative"),
});

export type ProductFormSchema = z.infer<typeof productSchema>;