import { z } from "zod";

export const bookAddSchema = z.object({
    BookName: z.string().min(3, "Book Name is required"),
    Author: z.string().min(3, "Author is required"),
    Price: z.number().min(1, "Price must be greater than 0"),
    Stock: z.number().min(1, "Stock must be greater than 0"),
    CategoryId: z.string().nonempty("Atleast Select One"),
    // PictureFile: z
    //     .any()
    //     .optional()
    //     // .refine((file) => file?.length === 1, "Photo is required")
    //     .refine(
    //         (file) =>
    //             file?.[0]?.type === "image/jpeg" ||
    //             file?.[0]?.type === "image/png" ||
    //             file?.[0]?.type === "image/jpg",
    //         "Only .jpg, .jpeg, or .png files are accepted"
    //     ),
    PictureFile: z
        .any()
        .optional()
        .refine((file) => {
            if (!file || file.length === 0) return true;
            return (
                file[0].type === "image/jpeg" ||
                file[0].type === "image/png" ||
                file[0].type === "image/jpg"
            );
        }, "Only .jpg, .jpeg, or .png files are accepted"),
});

export type BookAddFormData = z.infer<typeof bookAddSchema>;
