import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

import "./Dashboard.css";
import Footer from "../../components/footer/Footer";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import TaskCard from "../../components/card/Card";
import { fetchAllTasks,} from "../../services/taskService";
import { toast } from "react-toastify";
import FormDialog from "../../components/dialog/Dialog";
import { TaskContext } from "../../contexts/taskContext";
import { fetchUserDetails } from "../../services/authService";
import { useDialog } from "../../hooks/useDialog";

const HeroSection: React.FC= () => {
  const{openDialog}=useDialog()
  const [user,setUser]=useState({
    name:'',
    email:''
  })
  useEffect(()=>{

    const getUserDetails=async()=>{
    const result=await fetchUserDetails();
    setUser({name:result.data.user.name,email:result.data.user.email})
    }
    getUserDetails();

  },[])


  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        p: 4,
      }}
      disableGutters
    >
      <Box>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        {user.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
         {user.email}
        </Typography>
      </Box>
      <Button
        onClick={()=>openDialog()}
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "purple",
          height: "fit-content",
        }}
      >
        {" "}
        + Add Task
      </Button>
    </Container>
  );
};

const NotesSection: React.FC = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskList must be used within a TaskProvider");
  }
  const{tasks,dispatch}=context;
  const [loading, setLoading] = useState<boolean>(false);

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchAllTasks();
      dispatch({type:'SET_TASKS',payload:response.data.tasks})
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          flex: "1",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "purple" }} />
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          Please wait ...
        </Typography>
      </Container>
    );
  } else {
    return(
      <Grid2 container spacing={2} sx={{ p: 2 }}>
      {
          tasks.map(task=>{
              return <TaskCard task={task} key={task.id}/>
          })
      }
  </Grid2>
    );
  }
};

const DashboardContent: React.FC = () => {
   
  return (
    <main id="dashboard-content">
      <HeroSection  />
      <FormDialog  />
      <NotesSection />
    </main>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div id="dashboard-page">
      <Navbar />
      <DashboardContent />
      <Footer />
    </div>
  );
};

export default Dashboard;
