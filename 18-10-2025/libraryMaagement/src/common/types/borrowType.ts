export type BorrowType = {
    id: number,
    book: string,
    userId: number,
    borrowDate: string,
    returnDate?: string,
    status: string 
}