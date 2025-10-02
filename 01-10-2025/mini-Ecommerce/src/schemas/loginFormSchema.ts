import { z} from "zod";

export const loginFormSchema = z.object({
    email: z.string()
        .trim()
        .email("Invalid Email"),

    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
})

export type loginFormValues = z.infer<typeof loginFormSchema>;