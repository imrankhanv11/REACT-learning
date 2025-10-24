import React from "react";
import { useForm } from "react-hook-form"
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { loginFormSchema, type loginFromValues } from "../commons/scemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserAsync } from "../features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispathStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const dispatch = useDispatch<AppDispathStore>();
    const navigate = useNavigate();

    const formDefaultValues = {
        userName: "",
        password: ""
    };

    const { register, reset, handleSubmit, formState: { errors } }
        = useForm<loginFromValues>({
            resolver: zodResolver(loginFormSchema),
            mode: "onBlur",
            reValidateMode: "onChange",
            defaultValues: formDefaultValues
        });

    const fromSubmit = async (data: loginFromValues) => {
        // console.log(data);
        try {
            // const response = 
            await dispatch(loginUserAsync(data)).unwrap();

            reset(formDefaultValues);
            navigate('/');
        }
        catch (err: any) {
            toast.error(err || "Login Failed");
        }
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} />
            <Container className="my-2">
                <Row className=" justify-content-center">
                    <Col md={5}>
                        <Form noValidate className=" border rounded-2 p-2" onSubmit={handleSubmit(fromSubmit)}>
                            <h2 className=" text-center">Login</h2>
                            <Form.Group className=" mt-3">
                                <Form.Label>User Name: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the User Name"
                                    {...register("userName")}
                                    isInvalid={!!errors.userName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.userName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className=" mt-3">
                                <Form.Label>password: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the User Password"
                                    {...register("password")}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="info" className=" mt-4 w-100 border-0 btn btn-outline-dark" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default React.memo(Login);