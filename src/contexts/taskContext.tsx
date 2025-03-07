import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Task, Action, tasksReducer } from "../reducers/taskReducer";

export interface TaskContextType {
    tasks: Task[];
    dispatch: Dispatch<Action>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);


export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
