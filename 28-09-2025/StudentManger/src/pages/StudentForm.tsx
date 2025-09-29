import React, { useCallback, useEffect, useState } from "react";
import { studentFormSchema } from "../schemas/studentFormSchem";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { type StudentType } from "../types/studentsTypes";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/studentContext";

type StudentFormValues = z.infer<typeof studentFormSchema>;

const StudentForm: React.FC  = () => {

    const {editStudentItem, updateStudent, addStudent } = useStudentContext();

    const navigater = useNavigate();

    const [preview, setPreview] = useState<string>("");

    const formDefaultValue = {
        name: "",
        email: "",
        age: 6,
        dateOfBirth: null,
        enrollmentDate: null,
        course: "",
        phoneNumber: "",
        status: undefined,
        photoUrl: ""
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
    }, [watchOnDOB]);

    const onReset = useCallback(()=>{
        reset(formDefaultValue);
        setPreview("");
    },[reset, setPreview]);


    useEffect(() => {
        if (editStudentItem) {
            setValue("name", editStudentItem.name);
            setValue("email", editStudentItem.email); setValue(
                "enrollmentDate",
                editStudentItem.enrollmentDate ? new Date(editStudentItem.enrollmentDate) : null
            );
            setValue("course", editStudentItem.course);
            setValue("phoneNumber", editStudentItem.phoneNumber);
            setValue("status", editStudentItem.status);
            setValue("age", 6);
            setValue(
                "dateOfBirth",
                editStudentItem.dateOfBirth ? new Date(editStudentItem.dateOfBirth) : null
            );


            if (editStudentItem.photoUrl) {
                setValue("photoUrl", editStudentItem.photoUrl);
                setPreview(editStudentItem.photoUrl);
            } else {
                setPreview("");
            }
        }
        else {
            reset(formDefaultValue);
        }

    }, [editStudentItem, reset]);


    const onSubmitForm: SubmitHandler<StudentFormValues> = (dataValues) => {

        // const emailCheck = checkEmailExits(dataValues.email);

        // if (emailCheck) {
        //     toast.error("Email Aready exits");
        //     return;
        // }

        if (editStudentItem) {
            const updatedStudentNew: StudentType = {
                ...dataValues,
                id: editStudentItem.id,
                photoUrl: dataValues.photoUrl,
                enrollmentDate: dataValues.enrollmentDate ? dataValues.enrollmentDate : null
            };
            updateStudent(updatedStudentNew);
        }
        else {

            const newStudent: StudentType = {
                ...dataValues,
                id: Date.now(),
                photoUrl: dataValues.photoUrl,
                enrollmentDate: dataValues.enrollmentDate ? dataValues.enrollmentDate : null
            };

            addStudent(newStudent);

        }
        reset(formDefaultValue);
        localStorage.removeItem("studentFormData");
        setPreview("");
        navigater("/");

    };

    const handleFileChange = (file: File | null, onChange: (v: string) => void) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            onChange(base64);
            setPreview(base64);
        };
        reader.readAsDataURL(file);
    };

    // // 1. Save form data whenever it changes
    // useEffect(() => {
    //     const subscription = watch((value) => {
    //         localStorage.setItem("studentFormData", JSON.stringify(value));
    //     });
    //     return () => subscription.unsubscribe();
    // }, [watch]);

    // // 2. Restore form data on page load
    // useEffect(() => {
    //     const savedData = localStorage.getItem("studentFormData");
    //     if (savedData) {
    //         reset(JSON.parse(savedData));
    //         if (JSON.parse(savedData).photoUrl) {
    //             setPreview(JSON.parse(savedData).photoUrl);
    //         }
    //     }
    // }, [reset]);

    // const watchAllFields = watch();
    // const isFormDirty = Object.values(watchAllFields).some(
    //     (val) => val !== "" && val !== null && val !== undefined
    // );

    // useUnsavedChangesWarning(isFormDirty);


    return (
        <>
            {/* <div>
                <ToastContainer position="top-right" autoClose={2000} />
            </div> */}
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

                            <Controller
                                name="photoUrl"
                                control={control}
                                render={({ field }) => (
                                    <Form.Group className="mb-4">
                                        <Form.Label>Student Photo <small className="text-danger">*</small></Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            isInvalid={!!errors.photoUrl}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleFileChange(e.currentTarget.files?.[0] || null, field.onChange)
                                            }

                                        />
                                        {errors.photoUrl && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.photoUrl.message}
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


                            <Button type="submit" className="w-100 mb-2" variant={editStudentItem ? "info" : "success"}>
                                {editStudentItem ? "Update" : "Add"}
                            </Button>
                            <Button type="button" className="w-100" variant="dark" onClick={()=> onReset()}>
                                Reset
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default React.memo(StudentForm);