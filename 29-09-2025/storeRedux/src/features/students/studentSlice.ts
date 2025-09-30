import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "../../types/studentTypes";

interface StudentState {
    list: Student[];
    editId: number | null;
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
    editId: null
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
        },
        setEditStudent: (state, action: PayloadAction<number | null>) => {
            state.editId = action.payload;
        },
        updateStudent: (state, action: PayloadAction<Student>) => {
            const index = state.list.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        // updateStudent: (state, action: PayloadAction<{ id: number, data: Omit<Student, "id"> }>) => {
        //     const index = state.list.findIndex(s => s.id === action.payload.id);
        //     if (index !== -1) {
        //         state.list[index] = { id: action.payload.id, ...action.payload.data };
        //     }
        // }
    }
});

export const { addStudent, deleteStudent, setEditStudent, updateStudent } = studentSlice.actions;
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