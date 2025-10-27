import React from "react";
import { useForm } from "react-hook-form";
import { loginFormSchema, type loginFormData } from "../schema/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import type { StoreDispatch } from "../store/store";
import { toast } from "react-toastify";
import { loginUser, logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();

    const formDefaultValues = {
        email: "", password: ""
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<loginFormData>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(loginFormSchema),
        defaultValues: formDefaultValues
    });

    const formSubmit = async (data: {email: string, password: string}) => {
        // console.log(data);
        try {
            await dispatch(loginUser(data)).unwrap();
            toast.success("Login Successfull");

            navigate("/");
        }
        catch (err: any) {
            toast.error(err || "Login Faild");
        }

        reset(formDefaultValues);
    }

    return (
        <div>
            <Card className="mx-auto mt-3 rounded-3 shadow mb-2" style={{ maxWidth: "380px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4 text-success">Login</h2>

                    <Form noValidate onSubmit={handleSubmit(formSubmit)}>
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

                        <Button type="submit" className="w-100 mb-2 btn btn-info" disabled={isSubmitting}>
                            Login
                        </Button>


                    </Form>
                    <Button
                        variant="primary"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </Button>

                </Card.Body>
            </Card>
        </div>
    )
}

export default React.memo(Login);