import z from "zod";

export const employeeOnBoardSchema = z.object({
    firstName: z.string()
        .trim()
        .min(3, "Minimum 3 Letter Required")
        .max(20, "Maximum 20 Letter only Allowed"),

    middleName: z.string()
        .max(20, "Maximum 20 Letter only Allowed")
        .optional(),

    lastName: z.string()
        .trim()
        .min(3, "Minimum 3 Letter Required")
        .max(20, "Maximum 20 Letter only Allowed"),

    email: z
        .email("Invalid Email Type"),

    phoneNumber: z
        .string()
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits")
        .regex(/^\d+$/, "Mobile number can contain only digits"),

    departmentId: z.string().nonempty("Atleast Select One"),

    roleId: z.string().nonempty("Atleast Select One"),

    locationId: z.string().nonempty("Atleast select One"),

    experience: z.number().nonnegative("Negative value not Accepted"),

    joiningDate: z.string().refine((data) => new Date(data) <= new Date(), "Joining Date Can't be in Future"),

    ctc: z.number().nonnegative("Negative Value not Acecpted").min(1, "Minimum Amount Required"),

});

export type employeeOnBoardData = z.infer<typeof employeeOnBoardSchema>;