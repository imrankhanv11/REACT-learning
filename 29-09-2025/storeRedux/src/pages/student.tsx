import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentFormSchema, type studentFormValues } from "../schema/studentFormSchema";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { addStudent } from "../features/students/studentSlice";
import type { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import type { Student } from "../types/studentTypes";


const Category: string[] = ["Science", "Maths", "Arts"]

const Student: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [preview, setPreview] = useState<string>("");

    const handleFileChange = (file: File | null, onChange: (value: string | null) => void) => {
        if (!file) {
            setPreview("");
            onChange(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setPreview(base64);
            onChange(base64);
        };
        reader.readAsDataURL(file);
    };


    const {
        register, control, handleSubmit, reset,
        formState: { errors }
    } = useForm<studentFormValues>({
        resolver: zodResolver(studentFormSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            category: [],
            gender: "male",
            dob: new Date(),
            image: ""
        }
    })

    const onSubmit = (data: studentFormValues) => {
        console.log(data);

        const newStudent: Student = {
            ...data, id: Date.now(), dob: new Date(data.dob).toISOString()
        }

        dispatch(addStudent(newStudent));

        reset({
            name: "",
            email: "",
            category: [],
            gender: "male",
            dob: new Date(),
            image: ""
        });

        setPreview("");
    }

    const onReset = () => {
        reset({
            name: "",
            email: "",
            category: [],
            gender: "male",
            dob: new Date(),
            image: ""
        });

        setPreview("");
    }
    const categoriesHandler = (e: React.ChangeEvent<HTMLInputElement>, cat: string, field: any) => {
        if (e.target.checked) {
            field.onChange([...(field.value || []), cat]);
        } else {
            field.onChange((field.value || []).filter((c: string) => c !== cat));
        }
    };


    return (
        <>
            <Container className=" mb-3">
                <Row className=" justify-content-center">
                    <Col md={5}>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)} className=" p-3 rounded shadow-lg" >
                            <Form.Group className="mb-4">
                                <Form.Label>
                                    Name <small className="text-danger">*</small>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Student Name"
                                    {...register("name")}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className=" mb-4">
                                <Form.Label>
                                    email<small className=" text-danger">*</small>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Mail id"
                                    {...register("email")}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <Form.Group className="mb-4">
                                        <Form.Label>Student Photo <small className="text-danger">*</small></Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            isInvalid={!!errors.image}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleFileChange(e.currentTarget.files?.[0] || null, field.onChange)
                                            }
                                        />
                                        {errors.image && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.image.message}
                                            </Form.Control.Feedback>
                                        )}
                                        {preview && (
                                            <div className="mt-2 text-center">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </div>
                                        )}
                                    </Form.Group>
                                )}
                            />


                            <Form.Group className=" mt-3">
                                <Form.Label>Category<small className=" text-danger">*</small></Form.Label>
                                <div>
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {Category.map((cat) => (
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
                                {errors.category && (
                                    <div className=" text-danger small">{errors.category.message}</div>
                                )}
                            </Form.Group>

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
                                                    value="male"
                                                    checked={field.value === "male"}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    type="radio"
                                                    label="Female"
                                                    value="female"
                                                    checked={field.value === "female"}
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


                            <Form.Group className="mb-3">
                                <Form.Label>Birth Date<small className=" text-danger">*</small></Form.Label>
                                <Controller
                                    name="dob"
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

                            <Button type="submit" className="w-100 mb-2" variant="success">
                                Add
                            </Button>
                            <Button type="button" className="w-100" variant="dark" onClick={() => onReset()}>
                                Reset
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default React.memo(Student);