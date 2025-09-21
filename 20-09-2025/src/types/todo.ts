export type Todo = {
    id: number,
    todo: string,
    description: string,
    isCompleted: boolean
}

export type TodoFormState = {
    title: string;
    description: string;
};

export type TodoFormAction =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_DESCRIPTION"; payload: string }
    | { type: "RESET" };