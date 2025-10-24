import React, { useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { schema } from "../schema/productFormSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import type { products } from "../types/productsType";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


type FormValues = z.infer<typeof schema>;

interface FormLayoutProbs {
    addProducts: (item: products) => void;
    editProduct: products | null;
    updateProducts: (item: products) => void;
}

const FormLayout: React.FC<FormLayoutProbs> = ({ addProducts, editProduct, updateProducts }) => {
    const navigate = useNavigate();

    const defaultValues = {
        name: "",
        type: undefined,
        categories: [],
        stock: 0,
        addedDate: null
    }

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: defaultValues
    })

    const CategoriesList: string[] = ["Plastctic", "Electronic", "Stationary"]

    const categoriesHandler = (e: React.ChangeEvent<HTMLInputElement>, cat: string, field: any) => {
        if (e.target.checked) {
            field.onChange([...(field.value || []), cat]);
        } else {
            field.onChange(field.value.filter((v: string) => v !== cat));
        }
    };

    useEffect(()=>{
        if(editProduct){
            reset({
                ...editProduct
            });
        }
        else{
            reset(defaultValues)
        }
    },[editProduct])

    const onSubmit: SubmitHandler<FormValues> = (data) => {

        if (editProduct) {
            const updateitem: products = {
                ...data, id: editProduct.id
            }

            updateProducts(updateitem);
            toast.info("Update Product succesfully");
        }
        else {

            const newproducts: products = {
                ...data, id: 0
            }
            addProducts(newproducts);
            toast.success("New Product added Succesfully");
        }

        reset(defaultValues)

        navigate("/");
    }

    return (
        <Container className="mb-3">
            <Row className=" justify-content-center" >
                <Col md={5}>
                    <Form noValidate className=" p-3 shadow rounded" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className=" text-center mb-2">Products</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("name")}
                                isInvalid={!!errors.name}
                                placeholder="Enter the Product Name"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Type
                            </Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Own"
                                    value="Own"
                                    {...register("type")}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="3rdParty"
                                    value="3rdParty"
                                    {...register("type")}
                                />
                            </div>
                            {errors.type && (
                                <div className="text-danger small">{errors.type.message}</div>
                            )}
                        </Form.Group>

                        <Form.Group className=" mt-3">
                            <Form.Label>Category<small className=" text-danger">*</small></Form.Label>
                            <div>
                                <Controller
                                    name="categories"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {CategoriesList.map((cat) => (
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
                            {errors.categories && (
                                <div className=" text-danger small">{errors.categories.message}</div>
                            )}
                        </Form.Group>

                        <Controller
                            name="stock"
                            control={control}
                            render={({ field }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock<small className=" text-danger">*</small></Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        isInvalid={!!errors.stock}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stock?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Buy Date<small className=" text-danger">*</small></Form.Label>
                            <Controller
                                name="addedDate"
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
                        <Button type="submit" variant={editProduct ? "info" : "dark"} className="w-100">
                            {editProduct ? "Update" : "Add"}
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default FormLayout;