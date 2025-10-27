import z from "zod";

export const loginFormSchema = z.object({
    email: z.email("Invalid Email type"),

    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Weak password"
    ),
})

export type loginFormData = z.infer<typeof loginFormSchema>;