import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bookAddSchema, type BookAddFormData } from "../schema/bookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootStateStore, StoreDispatch } from "../store/store";
import { addNewBook, removeEditBookItem, UpdateBook } from "../features/bookSlice";
import { api } from "../api/api";
import { privateEndPoints } from "../api/endPoints";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaWpforms } from "react-icons/fa6";

interface ICatResponse {
    id: number,
    name: string
}

const AddBooks: React.FC = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();
    const [cat, setCat] = useState<ICatResponse[] | null>(null);
    const edit = useSelector((state: RootStateStore) => state.BookStore.editItem);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await api.get(privateEndPoints.GetCat);
                setCat(response.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        if (cat === null) {
            fetchCat();
        }
    }, [cat]);

    const formDefaultValues: BookAddFormData = {
        BookName: "",
        Author: "",
        Price: 0,
        Stock: 0,
        CategoryId: "",
        PictureFile: undefined,
    };

    const {
        register,
        reset,
        handleSubmit,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<BookAddFormData>({
        resolver: zodResolver(bookAddSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: formDefaultValues,
    });

    useEffect(() => {
        if (edit && cat?.length) {
            reset({
                BookName: edit.bookName,
                Author: edit.author,
                Stock: edit.stock,
                Price: edit.price,
                CategoryId: edit.categoryId.toString()
            });
        }
    }, [edit, reset, cat?.length]);

    const onSubmit = async (data: BookAddFormData) => {
        const formData = new FormData();
        formData.append("BookName", data.BookName);
        formData.append("Author", data.Author);
        formData.append("Price", data.Price.toString());
        formData.append("Stock", data.Stock.toString());
        formData.append("CategoryId", data.CategoryId.toString());

        if (data.PictureFile && data.PictureFile.length > 0) {
            formData.append("PictureFile", data.PictureFile[0]);
        }

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            if (edit) {
                await dispatch(UpdateBook({ id: edit.id, data: formData })).unwrap();
                toast.info("Updated Sucessfully");

            } else {
                await dispatch(addNewBook(formData)).unwrap();
                toast.success("New Product Added Sucessfully");
            }

            reset(formDefaultValues);
            resetField("PictureFile");
            dispatch(removeEditBookItem());
            navigate("/books");
        } catch (err: any) {
            toast.error(err || "Failed");
        }
    };


    return (
        <div className="container my-5">

            <div className="row justify-content-center align-items-start g-4">

                <div className="col-lg-5 order-lg-1 order-2">
                    <Card className=" p-2">
                        <Card.Title><h2 className=" text-center">Add Book</h2></Card.Title>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-2">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control
                                    className=" form-control"
                                    type="text"
                                    {...register("BookName")}
                                    isInvalid={!!errors.BookName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.BookName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("Author")}
                                    isInvalid={!!errors.Author}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.Author?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("Price", { valueAsNumber: true })}
                                    isInvalid={!!errors.Price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.Price?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("Stock", { valueAsNumber: true })}
                                    isInvalid={!!errors.Stock}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.Stock?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Category ID</Form.Label>
                                <Form.Select {...register("CategoryId")} isInvalid={!!errors.CategoryId} >
                                    <option value="">--Select Category--</option>
                                    {cat?.map((map) =>
                                        <option key={map.id} value={map.id.toString()}>{map.name}</option>
                                    )}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.CategoryId?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    {...register("PictureFile")}
                                    isInvalid={!!errors.PictureFile}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.PictureFile?.message?.toString()}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {edit?.pictureLink && (
                                <div className="mb-2">
                                    <p>Current Image:</p>
                                    <img
                                        src={`https://localhost:7115${edit.pictureLink}`}
                                        alt="Book"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                </div>
                            )}

                            <Button type="submit" disabled={isSubmitting}>
                                {edit ? "Update" : "Add"}
                            </Button>
                            <Button type="button" variant="secondary" className="ms-2" onClick={() => reset(formDefaultValues)}>
                                Reset
                            </Button>
                        </Form>
                    </Card>
                </div>

                <div className="col-lg-5 order-lg-0 order-1">
                    <Card className="shadow-sm p-4 border-0 bg-light h-100 d-flex justify-content-center align-items-center text-center" style={{ minHeight: "580px" }}>
                        <div>
                            <h3 className="fw-bold text-dark"><FaWpforms size={100} color="green" /> Hello</h3>
                            <p className="text-muted">
                                <h1><span className=" text-danger">What</span> are you Thingking?</h1>
                                <h3>Just Add New <span className=" text-dark bg-info p-1 rounded rounded-2 fw-bold">Books</span></h3>
                            </p>
                        </div>
                    </Card>


                    <ToastContainer position="top-right" autoClose={2000} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(AddBooks);
