import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchAddTask } from "../../services/taskService";
import { toast } from "react-toastify";
import { TaskContext } from "../../contexts/taskContext";

interface FormDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
}
const FormDialog: React.FC<FormDialogProps> = ({
  openDialog,
  handleCloseDialog,
}) => {
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const context = React.useContext(TaskContext);
    if (!context) {
      throw new Error("TaskList must be used within a TaskProvider");
    }
  const{dispatch}=context;
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
      handleCloseDialog();
    }
    
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleTaskSubmit
          },
        }}
      >
        <DialogTitle>Add Task</DialogTitle>
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
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button type="submit" loading={loading} color="secondary">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
