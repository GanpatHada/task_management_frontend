import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../services/authService";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const startLoading = (): void => setLoading(true);
  const stopLoading = (): void => setLoading(false);
  type FormData = {
    name: string;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      startLoading();
      const response: any = await registerUser(data);
      const response2: any = await loginUser({
        email: data.email,
        password: data.password,
      });
      toast.success(response.message);
      localStorage.setItem("accessToken", response2.data.accessToken);
      localStorage.setItem("refreshToken", response2.data.refreshToken);
      localStorage.setItem("userData", response2.data);
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("accessToken");
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ my: 2 }}>
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
          />
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
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
