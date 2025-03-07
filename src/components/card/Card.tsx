import React, { useState } from "react";
import "./Card.css";
import {
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
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6">
            {task.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "gray" }}
            component="div"
          >
            {task.description}
          </Typography>
          <Typography variant="body2">
            {new Date(task.due_date).toLocaleDateString("en-GB")}
            <br />
          </Typography>
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
            // onClick={handleOpenDialog}
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
