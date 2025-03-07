import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchAddTask, Task } from "../../services/taskService";
import { toast } from "react-toastify";
import { TaskContext } from "../../contexts/taskContext";
import React, { useContext, useEffect, useState } from "react";
import { useDialog } from "../../hooks/useDialog";



const FormDialog: React.FC = () => {
  const{dialog,closeDialog}=useDialog();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const context = useContext(TaskContext);
    if (!context) {
      throw new Error("TaskList must be used within a TaskProvider");
    }
  const{tasks,dispatch}=context;
  const[loading,setLoading]=React.useState<boolean>(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const result = await fetchAddTask(task);
      toast.success(result.message); 
      dispatch({type:'ADD_TASK',payload:result.data})
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    }
    finally{
      setLoading(false);
      closeDialog();
    }
    
  }

  
  
  
  useEffect(()=>{
    if(dialog.taskId)
    {
      const currentTask:Task | undefined=tasks.find(task=>Number(task.id)===Number(dialog.taskId));
      setTask({title:currentTask?.title})

    }
  })

  return (
    <React.Fragment>
      <Dialog
        open={dialog.open}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleTaskSubmit
          },
        }}
      >
        <DialogTitle>{dialog.taskId?'Edit':'Add'} Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={task.title}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            value={task.description}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date" 
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={handleChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error">Cancel</Button>
          <Button type="submit" loading={loading} color="secondary">{dialog.taskId?'Edit':'Add'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
