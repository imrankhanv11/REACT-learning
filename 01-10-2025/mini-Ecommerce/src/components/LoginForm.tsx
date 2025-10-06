import React, { type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { type loginFormValues, loginFormSchema } from "../schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { type AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginrFormProbs {
    setShowRegister: React.Dispatch<SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginrFormProbs> = ({ setShowRegister }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const defaultFormValues = {
        email: "", password: ""
    }

    const {
        register, reset, handleSubmit, formState: { errors }
    } = useForm<loginFormValues>({
        resolver: zodResolver(loginFormSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: defaultFormValues
    })

    const onSubmit = (data: loginFormValues) => {
        console.log(data);

        dispatch(loginUser(data));

        reset(defaultFormValues);
        navigate("/");
        
    }

    return (
        <>
            <Container className=" mb-3">
                <Row className=" justify-content-center">
                    <Col md={5}>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)} className=" p-3 rounded shadow-lg" >
                            <h2 className=" text-center mt-2 text-info">Login Form</h2>

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

                            <Button type="submit" className="w-100 mb-2" variant="success">
                                Login
                            </Button>

                            <h6 className="text-center text-muted mt-3">
                                If need to register?{" "}
                                <span
                                    onClick={() => setShowRegister(false)}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary fw-semibold ms-1"
                                >
                                    Register
                                </span>
                            </h6>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default React.memo(LoginForm);