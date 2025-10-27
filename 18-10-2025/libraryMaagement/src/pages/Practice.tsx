import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ResponsiveFormPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ gender: string }>();

    const formSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="container my-5">
            {/* Wrapper Row */}
            <div className="row justify-content-center align-items-start g-4">

                <div className="col-lg-5 order-lg-1 order-1">
                    <Card className="shadow-sm p-3 border-0">
                        <Card.Header className="bg-dark text-white text-center rounded">
                            <h4>Form</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate onSubmit={handleSubmit(formSubmit)}>
                                <div className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Male"
                                            value="Male"
                                            {...register("gender")}
                                            isInvalid={!!errors.gender}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Female"
                                            value="Female"
                                            {...register("gender")}
                                            isInvalid={!!errors.gender}
                                        />
                                    </div>
                                    <div className="small text-danger">
                                        {errors.gender && errors.gender.message}
                                    </div>
                                </div>
                                <Button variant="primary" type="submit" className="w-100">
                                    ADD
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-5 order-lg-0 order-2">
                    <Card className="shadow-sm p-4 border-0 bg-light h-100 d-flex justify-content-center align-items-center text-center">
                        <div>
                            <h3 className="fw-bold text-dark">Hello 👋</h3>
                            <p className="text-muted">
                                <h1><span className=" text-danger">What</span> are you Thingking?</h1>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveFormPage;
