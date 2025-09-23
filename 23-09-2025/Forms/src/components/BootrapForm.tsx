import React from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {
    Form,
    Button,
    Container,
    Row,
    Col
} from "react-bootstrap";

const schema = z.object({
    name: z.string().min(3, "Min 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    gender: z.enum(["Male", "Female"], { message: "Select Gender" }),
    categories: z.array(z.string()).min(1, "Select at least 1 category"),
    country: z.string().nonempty("Select a Country"),
    age: z.number().min(1, "More then 1 age").max(100, "not more than 99"),
    birthDate: z
        .date()
        .refine((date) => date <= new Date(), {
            message: "Birth date cannot be in the future",
        })
        .refine((date) => {
            const minAge = 18;
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            return age >= minAge;
        }, {
            message: "You must be at least 18 years old",
        }),
    bio: z.string().min(5, "Bio must be at least 10"),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),

    birthDate2: z
        .date()
        .refine((date) => date <= new Date(), "Birth date cannot be in the future"),
    vacation: z
        .tuple([z.date(), z.date()])
        .refine(([start, end]) => start <= end, "Start date must be before end date"),


});

type FormValues = z.infer<typeof schema>;

const categoriesList = ["Sports", "Music", "Movies", "Books"];

const BootstrapForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: undefined,
            categories: [],
            country: "",
            age: 0,
            birthDate: new Date("1999-12-31"),
            bio: "",
            acceptTerms: false,
            birthDate2: new Date("2000-01-01"),
            vacation: [new Date("2025-01-01"), new Date("2025-01-07")],
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Submitted:", data);
        reset();
    };

    console.log("Bootrap Form")

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded">
                        <h3 className="text-center mb-3">React-Bootstrap Form</h3>

                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        {...field}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        {...field}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        {/* Gender (Radio) */}
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Male"
                                                value="Male"
                                                checked={field.value === "Male"}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Female"
                                                value="Female"
                                                checked={field.value === "Female"}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                            {errors.gender && (
                                <div className="text-danger small">{errors.gender.message}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categories</Form.Label>
                            <div>
                                <Controller
                                    name="categories"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {categoriesList.map((cat) => (
                                                <Form.Check
                                                    key={cat}
                                                    type="checkbox"
                                                    label={cat}
                                                    value={cat}
                                                    className="d-block"
                                                    checked={field.value?.includes(cat) || false}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            field.onChange([...(field.value || []), cat]);
                                                        } else {
                                                            field.onChange(field.value.filter((v: string) => v !== cat));
                                                        }
                                                    }}
                                                />
                                            ))}

                                        </>
                                    )}
                                />
                            </div>
                            {errors.categories && (
                                <div className="text-danger small">{errors.categories.message}</div>
                            )}
                        </Form.Group>

                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select {...field} isInvalid={!!errors.country}>
                                        <option value="">-- Select --</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        isInvalid={!!errors.age}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.age?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                        isInvalid={!!errors.birthDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.birthDate?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="bio"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        {...field}
                                        as="textarea"
                                        rows={3}
                                        isInvalid={!!errors.bio}
                                        style={{ resize: "none" }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.bio?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Controller
                                name="birthDate2"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                        />
                                        {fieldState.error && (
                                            <div className="invalid-feedback">{fieldState.error.message}</div>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Group>

                        {/* Date Range Picker */}
                        <Form.Group className="mb-3">
                            <Form.Label>Vacation Range</Form.Label>
                            <Controller
                                name="vacation"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <DatePicker
                                            selectsRange
                                            startDate={field.value[0]}
                                            endDate={field.value[1]}
                                            onChange={(dates) => field.onChange(dates as [Date, Date])}
                                            className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                            placeholderText="Select date range"
                                        />
                                        {fieldState.error && (
                                            <div className="invalid-feedback">{fieldState.error.message}</div>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Controller
                            name="acceptTerms"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="I accept terms and conditions"
                                        checked={field.value || false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        isInvalid={!!errors.acceptTerms}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.acceptTerms?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />


                        <Button type="submit" variant="primary" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(BootstrapForm);
