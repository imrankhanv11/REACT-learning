import React, { type SetStateAction } from "react";
import { type registerFormValues, registerFormSchema } from "../schemas/registerFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { registerUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

interface RegisterFormProbs {
    setShowRegister: React.Dispatch<SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProbs> = ({ setShowRegister }) => {

    const dispatch = useDispatch<AppDispatch>();

    const defaultFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const {
        register, reset, handleSubmit, formState: { errors }
    } = useForm<registerFormValues>({
        resolver: zodResolver(registerFormSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: defaultFormValues
    });

    const onSubmit = (data: registerFormValues) => {
        console.log(data);

        dispatch(registerUser(data));

        reset(defaultFormValues);
    }

    return (
        <>
            <Container className=" mb-3">
                <Row className=" justify-content-center">
                    <Col md={5}>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)} className=" p-3 rounded shadow-lg" >
                            <h2 className=" text-center mt-2 text-success">Register Form</h2>
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

                            <Form.Group className=" mb-4">
                                <Form.Label>
                                    Password<small className=" text-danger">*</small>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter the Password"
                                    {...register("password")}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className=" mb-4">
                                <Form.Label>
                                    Confirm Password<small className=" text-danger">*</small>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter the Confirm Password"
                                    {...register("confirmPassword")}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword?.message}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Button type="submit" className="w-100 mb-2" variant="success">
                                Register
                            </Button>

                            <h6 className="text-center text-muted mt-3">
                                Already have an account?{" "}
                                <span
                                    onClick={() => setShowRegister(true)}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary fw-semibold ms-1"
                                >
                                    Login
                                </span>
                            </h6>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default React.memo(RegisterForm);