import { z} from "zod";

export const registerFormSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Atleast need 3 Char"),

    email: z.string()
        .trim()
        .email("Invalid Email"),

    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    ),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            message: "Passwords must match",
            code: z.ZodIssueCode.custom
        });
    }

})

export type registerFormValues = z.infer<typeof registerFormSchema>;
