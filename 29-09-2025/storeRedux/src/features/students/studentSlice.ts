
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "../../types/studentTypes";

interface StudentState {
    list: Student[];
}

const loadFromLocalStorage = (): Student[] => {
    try {
        const data = localStorage.getItem("students");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveToLocalStorage = (students: Student[]) => {
    localStorage.setItem("students", JSON.stringify(students));
};

const initialState: StudentState = {
    list: loadFromLocalStorage(),
};

const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        addStudent: (state, action: PayloadAction<Omit<Student, "id">>) => {
            state.list.push({ id: Date.now(), ...action.payload });
            saveToLocalStorage(state.list);
        },
        deleteStudent: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(s => s.id !== action.payload);
            saveToLocalStorage(state.list);
        }
    }
});

export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;


// import { createSlice, type PayloadAction  } from "@reduxjs/toolkit";
// import type { Student } from "../../types/studentTypes";

// interface StudentState{
//     listStudent: Student[];
// }

// const initialState : StudentState = {
//     listStudent: [],
// }

// const studentSlice = createSlice({
//     name: "students",
//     initialState,
//     reducers: {
//         addStudents: (state, action: PayloadAction<Omit<Student, "id">>) =>{
//             state.listStudent.push({id: Date.now(), ...action.payload})
//         },
//         deleteStudents: (state, action: PayloadAction<number>) =>{
//             state.listStudent = state.listStudent.filter(s=> s.id !== action.payload);
//         }
//     }
// });

// export const {addStudents, deleteStudents} = studentSlice.actions;
// export default studentSlice.reducer;