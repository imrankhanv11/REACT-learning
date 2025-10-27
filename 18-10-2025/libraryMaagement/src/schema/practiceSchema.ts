import z from 'zod'

export const practiceFormSchema = z.object({
    gender: z.enum(["Male", "Female"], "Please Select Gender"),
})

export type practiceFormData = z.infer<typeof practiceFormSchema>;