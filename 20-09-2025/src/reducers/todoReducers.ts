// import { TodoFormAction, TodoFormState} from "../types/todo";

export type TodoFormState = {
    title: string;
    description: string;
};

export type TodoFormAction =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_DESCRIPTION"; payload: string }
    | { type: "RESET" };

export const todoFormReducer = (state: TodoFormState, action: TodoFormAction) : TodoFormState =>{
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "RESET":
            return { title: "", description: "" };
        default:
            return state;
    }
}