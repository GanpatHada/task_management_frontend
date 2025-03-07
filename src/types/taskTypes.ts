export interface Task {
    id: number;
    user_id: number;
    description: string;
    due_date: string; 
    completed: boolean;
    created_at: string;
    title: string;
}

export interface Tasks{
    tasks:Task[]
}