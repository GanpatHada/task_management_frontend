export interface Task {
    id: number;
    user_id: number;
    description: string;
    due_date: string;
    completed: boolean;
    created_at: string;
    title: string;
}


export type Action =
    | { type: "ADD_TASK"; payload: Task }
    | { type: "UPDATE_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: number }
    | { type: "TOGGLE_TASK_COMPLETION"; payload: number }
    | { type: "SET_TASKS"; payload: Task[] };


export const tasksReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];
        case "UPDATE_TASK":
            return state.map(task => (Number(task.id) === Number(action.payload.id) ? action.payload : task));
        case "DELETE_TASK":
            return state.filter(task => Number(task.id) !== Number(action.payload));
        case "TOGGLE_TASK_COMPLETION":
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case "SET_TASKS":
            return action.payload;
        default:
            return state;
    }
};

