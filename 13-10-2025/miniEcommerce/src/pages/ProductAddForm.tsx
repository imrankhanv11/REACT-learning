import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AppDispath } from "../store/app";
import { addNewProducts } from "../store/slices/productSlices";
import type { productAddType } from "../types/productAddType";
import { useDispatch } from "react-redux";
import { type ProductFormSchema, productSchema } from "../schema/addNewProductScema";
import { toast } from "react-toastify";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ProductAddForm: React.FC = () => {
    const dispatch = useDispatch<AppDispath>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
        },
    });

    const onSubmit = async (data: productAddType) => {
        try {
            await dispatch(addNewProducts(data)).unwrap();
            toast.success("Product added");

            reset();
            navigate("/admin/dashboard");

        } catch (err: any) {
            toast.error(err || "Adding in proudct fails");
        }
    };
    return (
        <Card className="mt-5 mx-auto shadow" style={{ maxWidth: "450px" }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Add New Product</Card.Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            {...register("name")}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter product description"
                            {...register("description")}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Price */}
                    <Form.Group className="mb-3">
                        <Form.Label>Price (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Enter product price"
                            {...register("price", { valueAsNumber: true })}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Stock */}
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter stock quantity"
                            {...register("stock", { valueAsNumber: true })}
                            isInvalid={!!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stock?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Adding...
                                </>
                            ) : (
                                "Add Product"
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default React.memo(ProductAddForm);
