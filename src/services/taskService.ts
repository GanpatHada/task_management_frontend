const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export interface Task {
    id: number;
    user_id: number;
    description: string;
    due_date: string; 
    completed: boolean;
    created_at: string;
    title: string;
  }
  
  interface TaskData {
    tasks: Task[];
  }
  
  interface TaskResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: TaskData;
  }

  

  
  

export const fetchAllTasks = async ():Promise<TaskResponse>=>{
  try {
    const response = await fetch(`${backendUrl}/task/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJnYW5wYXQ0QGdtYWlsLmNvbSIsImlhdCI6MTc0MTI3MTAxOSwiZXhwIjoxNzQxODc1ODE5fQ.9pjFZKmb-4Ns3R4f1_VaYZX9VKxjjjVW9ZuzA1FFZww"
      },
    });
    
   const result = await (response.json()) as TaskResponse;
   if (!result.success) 
    throw new Error(result.message || "fetching tasks failed. Please try again.");
   console.log(result);
   return result; 
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).message || "Something went wrong during fetching tasks.");
  }
};

interface NewTaskType{
  title:string,
  description:string,
  dueDate:string,
}

interface AddTaskResponse{
  statusCode: number;
  message: string;
  success: boolean;
  data: Task;
}


export const fetchAddTask=async(newTask:NewTaskType):Promise<AddTaskResponse>=>{
  try {
    const response = await fetch(`${backendUrl}/task/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJnYW5wYXQ0QGdtYWlsLmNvbSIsImlhdCI6MTc0MTI3MTAxOSwiZXhwIjoxNzQxODc1ODE5fQ.9pjFZKmb-4Ns3R4f1_VaYZX9VKxjjjVW9ZuzA1FFZww"
      },
      body:JSON.stringify(newTask)
    });
    
   const result = await (response.json()) as AddTaskResponse;
   if (!result.success) 
    throw new Error(result.message || "adding task failed. Please try again.");
   console.log(result);
   return result; 
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).message || "Something went wrong during adding task");
  }
}

interface DeleteTaskResponse{
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    taskId:number
  };
}

export const fetchDeleteTask=async(taskId:number):Promise<DeleteTaskResponse>=>{
  try {
    const response = await fetch(`${backendUrl}/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJnYW5wYXQ0QGdtYWlsLmNvbSIsImlhdCI6MTc0MTI3MTAxOSwiZXhwIjoxNzQxODc1ODE5fQ.9pjFZKmb-4Ns3R4f1_VaYZX9VKxjjjVW9ZuzA1FFZww"
      },
    });
    
   const result = await (response.json()) as DeleteTaskResponse;
   if (!result.success) 
    throw new Error(result.message || "failed task deleting. Please try again.");
   return result; 
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).message || "Something went wrong during deleting task");
  }

}
