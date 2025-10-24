import z from 'zod';

export const loginFormSchema = z.object({
    userName: z.string()
        .trim()
        .min(2, "Minimum 2 Letter Required"),

    password: z.string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        )
});

export type loginFromValues = z.infer<typeof loginFormSchema>;