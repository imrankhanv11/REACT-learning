export const publicEndPoints = {
    Login: `/Account/user/login`,
    FetchAllBooks : `/Book/book/getall`
}

export const privateEndPoints = {
    AddBook: `/Book/book/add`,
    GetCat: `/Book/Book/Cat`,
    DeleteBook: (id: number) => `/Book/delete/${id}`,
    UpdateBook: (id: number) => `/Book/update/${id}`,

    BorrowBook: (id: number) => `/Borrow/borrowbook/${id}`
}