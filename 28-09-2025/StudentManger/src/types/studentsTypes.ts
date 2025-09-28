export interface StudentType {
    id: number,
    name: string,
    email: string,
    age: number,
    dateOfBirth: Date | null,
    enrollmentDate: Date | null,
    course: string,
    phoneNumber: string,
    status: "Active" | "Inactive",
    photoUrl: string,
}