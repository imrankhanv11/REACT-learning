import React, { useEffect } from "react";
import { studentFormSchema } from "../schemas/studentFormSchem";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { type StudentType } from "../types/studentsTypes";
import { useNavigate } from "react-router-dom";


type StudentFormValues = z.infer<typeof studentFormSchema>;

interface StudentFormProbs {
    onAddStudent: (item: StudentType) => void;
    editStudentItem: StudentType | null;
    updateStudent: (item: StudentType) => void;
}

const StudentForm: React.FC<StudentFormProbs> = ({ onAddStudent, editStudentItem, updateStudent }) => {

    const navigater = useNavigate();

    const formDefaultValue = {
        name: "",
        email: "",
        age: 6,
        dateOfBirth: null,
        enrollmentDate: null,
        course: "",
        phoneNumber: "",
        status: undefined
    }


    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<StudentFormValues>({
        resolver: zodResolver(studentFormSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: formDefaultValue
    });

    const watchOnDOB = watch("dateOfBirth");

    useEffect(() => {
        const date: number = watchOnDOB ? watchOnDOB.getFullYear() : 0;

        const calculation: number = new Date().getFullYear() - date;

        setValue("age", calculation)
    }, [watchOnDOB])


    useEffect(() => {
        if (editStudentItem) {
            setValue("name", editStudentItem.name);
            setValue("email", editStudentItem.email);
            setValue("enrollmentDate", editStudentItem.enrollmentDate);
            setValue("course", editStudentItem.course);
            setValue("phoneNumber", editStudentItem.phoneNumber);
            setValue("status", editStudentItem.status);
            setValue("age", 6);

        }
        else {
            reset(formDefaultValue);
        }

    }, [editStudentItem, reset]);


    const onSubmitForm: SubmitHandler<StudentFormValues> = (dataValues) => {
        if (editStudentItem) {
            const updatedStudentNew: StudentType = {
                ...dataValues,
                id: editStudentItem.id,

                enrollmentDate: dataValues.enrollmentDate ? dataValues.enrollmentDate : null
            };
            updateStudent(updatedStudentNew);
        }
        else {
            const newStudent: StudentType = {
                ...dataValues,
                id: Date.now(),
                enrollmentDate: dataValues.enrollmentDate ? dataValues.enrollmentDate : null
            };

            onAddStudent(newStudent);

        }
        reset(formDefaultValue);

        navigater("/");

    };

    return (
        <Container className=" mb-4">
            <Row className=" justify-content-center">
                <Col md={5}>
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)} className="p-3 rounded-2 shadow-lg">
                        <h3 className=" text-center" style={{ color: "Orange" }}>Student Form</h3>

                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-4">
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
                                <Form.Group className="mb-4">
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

                        <Form.Group className="mb-4">
                            <Form.Label>Date of Birth<small className=" text-danger">*</small></Form.Label>
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="position-relative">
                                            <DatePicker
                                                selected={field.value || null}
                                                onChange={(date) => field.onChange(date)}
                                                className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                                placeholderText="Select a Date of Birth"
                                                showYearDropdown
                                                showMonthDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={70}
                                                isClearable
                                                dateFormat="dd-MM-yyyy"
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
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-4">
                                    <Form.Label>Age<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        readOnly
                                        type="number"
                                        value={field.value}
                                        isInvalid={!!errors.age}
                                    />
                                    <div className=" small text-muted">Auto calculate using Date of Birth</div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.age?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-4">
                            <Form.Label>EnrollmentDate<small className=" text-muted"> (optional)</small></Form.Label>
                            <Controller
                                name="enrollmentDate"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="position-relative">
                                            <DatePicker
                                                selected={field.value || null}
                                                onChange={(date) => field.onChange(date)}
                                                className={`form-control ${fieldState.error ? "is-invalid" : ""}`}
                                                placeholderText="Select a Enrollment Date"
                                                showYearDropdown
                                                showMonthDropdown
                                                scrollableYearDropdown
                                                yearDropdownItemNumber={70}
                                                isClearable
                                                dateFormat="dd-MM-yyyy"
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
                            name="course"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-4">
                                    <Form.Label>Course<small className=" text-danger">*</small></Form.Label>
                                    <Form.Select {...field} isInvalid={!!errors.course}>
                                        <option value="">-- Select a Course --</option>
                                        <option value="C#">C#</option>
                                        <option value="React">React</option>
                                        <option value="Angular">Angular</option>
                                        <option value="JS">JS</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.course?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        isInvalid={!!errors.phoneNumber}
                                        placeholder="Enter Mobile Number"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-4">
                            <Form.Label>Status<small className=" text-danger">*</small></Form.Label>
                            <div>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Form.Check
                                                type="radio"
                                                value="Active"
                                                label="Active"
                                                inline
                                                checked={field.value === "Active"}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="In Active"
                                                value="Inactive"
                                                checked={field.value === "Inactive"}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                            {errors.status && (
                                <div className=" text-danger small"> {errors.status.message}</div>
                            )}
                        </Form.Group>


                        <Button type="submit" className="w-100" variant={editStudentItem ? "info" : "success"}>
                            {editStudentItem ? "Update" : "Add"}
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(StudentForm);