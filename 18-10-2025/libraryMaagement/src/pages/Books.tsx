import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootStateStore, StoreDispatch } from "../store/store";
import { Alert, Spinner } from "react-bootstrap";
import { clearError, deleteBook, editBookItem, fetchAllBooks } from "../features/bookSlice";
import { Button } from "react-bootstrap";
import ConfirmModel from "../common/componets/ConfirmModel";
import { toast, ToastContainer } from "react-toastify";
import type { BookType } from "../common/types/bookType";
import { useNavigate } from "react-router-dom";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { borrwBook } from "../features/borrowSlice";

const Books: React.FC = () => {

    const { items, error, loading } = useSelector((state: RootStateStore) => state.BookStore);
    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [deleteId, seDeleteId] = useState<number | null>(null);
    const role = useDecodeToken();

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchAllBooks());
        }
    }, [dispatch, items.length]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    if (loading) {
        return (
            <div className=" d-flex justify-content-center align-items-center" style={{ height: "75px" }}>
                <Spinner variant="success" />
            </div>
        )
    }

    if (error) {
        return (
            <div className=" d-flex justify-content-center mt-2" >
                <Alert variant="danger" >{error}</Alert>
            </div>
        )
    }

    const deleteOnClick = (id: number) => {
        seDeleteId(id);
        setShow(true);
    }

    const comfirmOnclickDelete = async () => {
        try {
            if (deleteId !== null) {
                await dispatch(deleteBook(deleteId)).unwrap();
            }
            setShow(false);
            seDeleteId(null);
        }
        catch (err: any) {
            toast.error(err || "Failed");
            setShow(false);
            seDeleteId(null);
        }
    }

    const editBook = async (item: BookType) => {
        dispatch(editBookItem(item));
        navigate("/addBook");
    }

    const borrowBook = async (id: number) => {
        try {
            await dispatch(borrwBook(id)).unwrap();
            toast.success("Sucessfully Borrowed");
        }
        catch (err: any) {
            toast.error(err || "Failed")
        }
    }

    return (
        <div>
            {items.map((item) => <div key={item.id}>{item.author}, {item.bookName}, <img src={`https://localhost:7115${item.pictureLink}`} title={item.bookName} width={100} />
                {role === "Admin" ?
                    <><Button onClick={() => deleteOnClick(item.id)} className=" btn btn-danger">
                        Delete
                    </Button>
                        <Button onClick={() => editBook(item)} className=" btn btn-info" >
                            Edit
                        </Button>
                    </> : <Button className=" btn btn-sm btn-info" onClick={() => borrowBook(item.id)}>Borrow</Button>
                }
            </div>)
            }
            <div>
            </div>
            <ConfirmModel
                show={show}
                onClose={() => setShow(false)}
                onConfirm={comfirmOnclickDelete}
                message="Do you Want to Delete the Book"

            />
            <ToastContainer position="top-right" autoClose={2000} />
        </div >
    )
}

export default React.memo(Books);