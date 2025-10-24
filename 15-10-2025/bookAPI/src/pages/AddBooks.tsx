import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addBookSchema, type addBookSchemaValues } from "../commons/scemas/addBookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispathStore, RootState } from "../store/store";
import { addBookMethod, editBook } from "../features/bookSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBooks: React.FC = () => {

    const dispatch = useDispatch<AppDispathStore>();
    const editItem = useSelector((state: RootState) => state.BookStore.editBook);
    const navigate = useNavigate();

    const formDefaultValues: addBookSchemaValues = {
        title: "",
        author: "",
        price: 0,
        stock: 0,
        categoryId: 0
    };

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<addBookSchemaValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(addBookSchema),
        defaultValues: formDefaultValues
    });


    const submitForm = async (data: addBookSchemaValues) => {
        try {
            if (editItem) {
                console.log(data);
                dispatch(editBook(null));
            }
            else {
                await dispatch(addBookMethod(data));
                reset(formDefaultValues);
            }
            navigate("/books");
        }
        catch (err: any) {
            toast.error(err || "Failed");
        }
    };

    useEffect(() => {
        if (editItem) {
            reset(editItem);
        }
    }, [editItem]);

    return (
        <Container className="my-2">
            <Row className="justify-content-center">
                <Col md={5}>
                    <Form noValidate className="rounded-4 border p-3" onSubmit={handleSubmit(submitForm)}>
                        <h3 className="text-center text-success mt-3">Add New Book</h3>

                        {/* Title */}
                        <Form.Group className="mt-4">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the Title"
                                {...register("title")}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Author */}
                        <Form.Group className="mt-4">
                            <Form.Label>Author:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the Author"
                                {...register("author")}
                                isInvalid={!!errors.author}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.author?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Price */}
                        <Form.Group className="mt-4">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the price"
                                {...register("price", { valueAsNumber: true })}
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Stock */}
                        <Form.Group className="mt-4">
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the stock"
                                {...register("stock", { valueAsNumber: true })}
                                isInvalid={!!errors.stock}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stock?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Category */}
                        <Form.Group className="mt-4">
                            <Form.Label>Category:</Form.Label>
                            <Form.Select
                                {...register("categoryId", { valueAsNumber: true })}
                                isInvalid={!!errors.categoryId}
                            >
                                <option value={""}>-- select --</option>
                                <option value={1}>Book 1</option>
                                <option value={2}>Book 2</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.categoryId?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className="mt-4 w-100" type="submit">Add Book</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(AddBooks);
