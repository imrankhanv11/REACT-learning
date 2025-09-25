
export interface StudentItems {
    id: number
    name: string,
    email: string,
    gender: "Male" | "Female",
    categories: string[],
    mobile: string,
    birthDate: Date | null,
    country: string,
    rating: number,
    duration: (Date | null)[]; 
}