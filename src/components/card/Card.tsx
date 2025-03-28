import React, { useState } from "react";
import "./Card.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { fetchDeleteTask, Task } from "../../services/taskService";
import { toast } from "react-toastify";
import { TaskContext } from "../../contexts/taskContext";
import { useDialog } from "../../hooks/useDialog";

interface TaskProp {
  task: Task;
}

const TaskCard: React.FC<TaskProp> = ({ task }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("TaskList must be used within a TaskProvider");
  }
  const { dispatch } = context;
  const {openDialog}=useDialog()
  const handleDeleteTaks = async () => {
    try {
      setLoading(true);
      const response = await fetchDeleteTask(task.id);
      console.log(response);
      toast.success(response.message);
      dispatch({ type: "DELETE_TASK", payload: response.data.taskId });
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid2 size={{ xs: 12, md: 3 }}>
      <Card variant="outlined" sx={{display:'flex',flexDirection:'column',height:'100%'}}>
        <CardContent sx={{flex:'1',display:'flex',flexDirection:'column',gap:'5px'}}>
          <Typography gutterBottom variant="h6">
            {task.title}
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{ color: "gray",lineHeight:'normal'}}
            component="div"
          >
            {task.description}
          </Typography>
          <Box>
          <Typography variant="body2">
            <strong>Create at : </strong>{new Date(task.created_at).toLocaleDateString("en-GB")}
            <br />
          </Typography>
          
          <Typography variant="body2">
            <strong>Due date : </strong>{new Date(task.due_date).toLocaleDateString("en-GB")}
            <br />
          </Typography>
          </Box>
          {task.completed && <Typography variant="h6" sx={{fontSize:'0.8rem',background:'green',color:'white',width:'fit-content',padding:'3px 8px',borderRadius:'16px'}}>completed</Typography>}
        </CardContent>
        
        <CardActions>
          <Button
            size="small"
            loading={loading}
            color="error"
            onClick={handleDeleteTaks}
          >
            delete
          </Button>
          <Button
            onClick={()=>openDialog(task.id)}
            size="small"
            color="secondary"
          >
            edit
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default TaskCard;
