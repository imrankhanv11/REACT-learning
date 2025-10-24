import type { bookType } from "../commons/types/bookType";
import api from "./api"
import { apiErrorHandler } from "./apiErrorHandler";
import { privateEndPoints, publicEndPoints } from "./endPoints"

// Login 
export const loginUser = async (user: { userName: string, password: string }) => {
    try {
        const Response = await api.post(publicEndPoints.LOGIN_USER, user);
        // console.log(Response.data);
        return Response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}

// FetchAllBooks
export const fetchAllBooks = async () => {
    try {
        const response = await api.get(publicEndPoints.FETCH_BOOKS);
        return response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}

// DeleteBook
export const deleteBook = async (id: number) => {
    try {
        const response = await api.delete(privateEndPoints.DELETE_BOOK(id));
        return response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}

// AddBook
export const addBook = async (book: {
    title: string,
    author: string,
    price: number,
    stock: number,
    categoryId: number
}) => {
    try {
        const response = await api.post<bookType>(privateEndPoints.ADD_BOOK, book);
        return response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}