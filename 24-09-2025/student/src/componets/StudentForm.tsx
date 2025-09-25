import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import 'react-datepicker/dist/react-datepicker.css';
import {
    Form, Button, Container, Row, Col
} from "react-bootstrap"
import DatePicker from "react-datepicker";
import { type StudentItems } from "../types/StudentsTypes";
import { schema } from "../schema/studentFormSchema";

type FormValues = z.infer<typeof schema>;

const CategoriesList: string[] = ["Sports", "Dance", "Music", "Social"];

interface StudentFormProbs {
    onAdd: (item: StudentItems) => void;
    editStudent: StudentItems | null;
    onUpdate: (item: StudentItems) => void;
}

const StudentForm: React.FC<StudentFormProbs> = ({ onAdd, editStudent, onUpdate }) => {

    console.log("Form")

    const defaultValuesForm = {
        name: "",
        email: "",
        gender: undefined,
        categories: [],
        mobile: "",
        birthDate: null,
        country: "",
        rating: 0,
        duration: [null, null] as [Date | null, Date | null]
    };


    const {
        control,
        handleSubmit,
        // register,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: defaultValuesForm
    });

    // useEffect(() => {
    //     if (editStudent) {
    //         reset({
    //             ...editStudent
    //         });
    //     }
    //     else {
    //         reset(defaultValuesForm);
    //     }
    // }, [editStudent, reset]);

    useEffect(() => {
        if (editStudent) {
            reset({
                ...editStudent,
                duration: [
                    editStudent.duration?.[0] || null,
                    editStudent.duration?.[1] || null
                ]
            });
        } else {
            reset(defaultValuesForm);
        }
    }, [editStudent, reset]);



    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (editStudent) {
            const updatedStudent: StudentItems = {
                ...data,
                id: editStudent.id,
            };
            onUpdate(updatedStudent);
        }
        else {
            const newStudent: StudentItems = {
                ...data,
                id: 0,
            };
            onAdd(newStudent);
        }
        reset(defaultValuesForm);
    };

    const categoriesHandler = (e: React.ChangeEvent<HTMLInputElement>, cat: string, field: any) => {
        if (e.target.checked) {
            field.onChange([...(field.value || []), cat]);
        } else {
            field.onChange(field.value.filter((v: string) => v !== cat));
        }
    };


    return (
        <Container className="mb-3">
            <Row className=" justify-content-center">
                <Col md={6}>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded form-own-css">
                        <h4 className=" text-center mb-3" style={{ color: "red" }}>Student Form</h4>

                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Name<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        isInvalid={!!errors.name}
                                        placeholder="Enter the Student Name"
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Email<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="email"
                                        {...field}
                                        isInvalid={!!errors.email}
                                        placeholder="Enter the Student Email"
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Gender<small className=" text-danger">*</small></Form.Label>
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
                                <div className=" text-danger small"> {errors.gender.message}</div>
                            )}
                        </Form.Group>

                        <Form.Group className=" mt-3">
                            <Form.Label>Category<small className=" text-danger">*</small></Form.Label>
                            <div>
                                <Controller
                                    name="categories"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {CategoriesList.map((cat) => (
                                                <Form.Check
                                                    key={cat}
                                                    type="checkbox"
                                                    label={cat}
                                                    value={cat}
                                                    className="d-block"
                                                    checked={field.value?.includes(cat) || false}
                                                    onChange={(e) => categoriesHandler(e, cat, field)}
                                                />
                                            ))}
                                        </>
                                    )}
                                />
                            </div>
                            {errors.categories && (
                                <div className=" text-danger small">{errors.categories.message}</div>
                            )}
                        </Form.Group>

                        <Controller
                            name="mobile"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        isInvalid={!!errors.mobile}
                                        placeholder="Enter Mobile Number"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.mobile?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date<small className=" text-danger">*</small></Form.Label>
                            <Controller
                                name="birthDate"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="position-relative">
                                            <DatePicker
                                                selected={field.value || null}
                                                onChange={(date) => field.onChange(date)}
                                                className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                                placeholderText="Select a date"
                                                dateFormat="dd-MM-yyyy"
                                                showYearDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={50}
                                                showMonthDropdown
                                                todayButton="Today"
                                                isClearable
                                            />

                                            {fieldState.error && (
                                                <div className="invalid-feedback d-block">
                                                    {fieldState.error.message}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Country<small className=" text-danger">*</small></Form.Label>
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
                            name="rating"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Rating<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        isInvalid={!!errors.rating}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.rating?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Duration<small className=" text-danger">*</small></Form.Label>
                            <Controller
                                name="duration"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="position-relative">
                                            <DatePicker
                                                selectsRange
                                                startDate={field.value?.[0]}
                                                endDate={field.value?.[1]}
                                                onChange={(dates) => field.onChange(dates as [Date | null, Date | null])}
                                                className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                                placeholderText="Select date range"
                                                dateFormat="dd-MM-yyyy"
                                                isClearable
                                            />
                                            {fieldState.error && (
                                                <div className="invalid-feedback d-block">
                                                    {fieldState.error.message}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Button type="submit" variant={editStudent ? "info" : "dark"} className="w-100">
                            {editStudent ? "Update" : "Add"}
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default React.memo(StudentForm);