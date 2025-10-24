import React from "react";
import type { bookType } from "../types/bookType";
import { type AppDispathStore } from "../../store/store";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { deleteBookMethod, editBook } from "../../features/bookSlice";
import { toast } from "react-toastify";
import useDecodeToken from "../../hooks/useDecodeToken";
import { useNavigate } from "react-router-dom";

interface BookListProbs {
    book: bookType
}

const BookList: React.FC<BookListProbs> = ({ book }) => {

    const role = useDecodeToken();
    const dispatch = useDispatch<AppDispathStore>();
    const navigate = useNavigate();

    const deleteBook = async (id: number) => {
        try {
            const response = await dispatch(deleteBookMethod(id)).unwrap();
            if (response.id) {
                toast.success("Deleted Succesfully");
            }
        }
        catch (err: any) {
            toast.error(err || "Faild");
        }
    }

    const editBookMethod = (book: bookType) => {
        dispatch(editBook(book));
        navigate("/addproducts");
    }

    return (
        <tr>
            <th>{book.bookId}</th>
            <th>{book.author}</th>
            <th>{book.title}</th>
            {/* <th>{book.categoryId}</th> */}
            <th>{book.price}</th>
            <th>{book.stock}</th>
            {role === "Admin" ?
                <th>
                    <div className=" d-flex justify-content-around">
                        <Button variant="info" className=" btn-sm" onClick={() => editBookMethod(book)}>Edit</Button>
                        <Button variant="danger" className=" btn-sm" onClick={() => deleteBook(book.bookId)}>Delete</Button>
                    </div>
                </th>
                :
                ""
            }
        </tr>
    )
}

export default React.memo(BookList);