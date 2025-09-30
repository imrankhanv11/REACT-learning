export type Gender = "male" | "female";

export interface Student{
    id: number;
    name: string;
    email: string;
    category: string[];
    gender: Gender;
    dob: string;
    image: string;
}