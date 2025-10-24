export const publicEndPoints = {
    LOGIN_USER: `/Login/LoginUser`,
    FETCH_BOOKS: `/Books/GellAllBooks`
}

export const privateEndPoints = {
    DELETE_BOOK: (id: number) => `/Books/DeleteBook/${id}`,
    ADD_BOOK: `/Books/Addbook`
}