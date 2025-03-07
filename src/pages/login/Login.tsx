import {Box, Button, Container,TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,formState: { errors },} = useForm<FormData>();
  const [loading,setLoading]=useState<boolean>(false)
  const startLoading=():void=>setLoading(true);
  const stopLoading=():void=>setLoading(false);

  const onSubmit = async(data: FormData) => {
    const {email,password}=data;
    try {
      startLoading();
      const response:any = await loginUser({email,password});
      toast.success(response.message);
      localStorage.setItem("accessToken",response.data.accessToken);
      localStorage.setItem("refreshToken",response.data.refreshToken);
      localStorage.setItem("userData",response.data);
      navigate("/");
    } catch (error) { 
      toast.error((error as Error).message || "Something went wrong")
    }
    finally{
      stopLoading()
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("accessToken"); 
    console.log(isAuthenticated)
    if(isAuthenticated){
      navigate("/");
    }
  }, [])

  return (
    <Container maxWidth="sm" sx={{display: "flex", height:'100vh',
      justifyContent: "center",
      alignItems: "center",}}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: 400,
          mx: "auto",
          border: "1px solid #dbdbdb",  
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ my: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            size="small"
            
          />
          <Button
            type="submit"
            loading={loading}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              py:1,
              backgroundColor: "#7200b5",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
