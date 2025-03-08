import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchAddTask, fetchEditTask } from "../../services/taskService";
import { toast } from "react-toastify";
import { TaskContext } from "../../contexts/taskContext";
import React, { useContext, useEffect, useState } from "react";
import { useDialog } from "../../hooks/useDialog";
import { Task } from "../../types/taskTypes";
import { Checkbox, FormControlLabel } from "@mui/material";
const FormDialog: React.FC = () => {
  const { dialog, closeDialog } = useDialog();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [completed, setCompleted] = React.useState(false);
  const handleTaskCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskList must be used within a TaskProvider");
  }
  const { tasks, dispatch } = context;
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await fetchAddTask(task);
      toast.success(result.message);
      dispatch({ type: "ADD_TASK", payload: result.data });
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
      closeDialog();
    }
  };

  const handleTaskEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await fetchEditTask(dialog.taskId,{...task,completed});
      dispatch({type:'UPDATE_TASK',payload:result.data.updatedTask})
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
      closeDialog();
    }
  };




  useEffect(() => {
    if (dialog.taskId) {
      const currentTask: Task | undefined = tasks?.find(
        (task) => Number(task.id) === Number(dialog.taskId)
      );
      setTask((prevTask) => ({
        ...prevTask,
        title: currentTask?.title ?? "",
        description: currentTask?.description ?? "",
        dueDate:
          new Date(currentTask?.due_date ?? "").toISOString().split("T")[0] ??
          "",
      }));
      setCompleted(currentTask?.completed ?? false)
      console.log(task.dueDate);
    }
  }, [dialog.open]);

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
            onSubmit: dialog.taskId?handleTaskEdit : handleTaskSubmit,
          },
        }}
        
      >
        <DialogTitle>{dialog.taskId ? "Edit" : "Add"} Task</DialogTitle>
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
            inputProps={{ maxLength: 40 }}
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
            inputProps={{ maxLength: 100 }}
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
          {dialog.taskId&& <FormControlLabel
            label="Task Completed"
            control={
              <Checkbox checked={completed} onChange={handleTaskCompleted} />
            }
          />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error">
            Cancel
          </Button>
          <Button type="submit" loading={loading} color="secondary">
            {dialog.taskId ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
