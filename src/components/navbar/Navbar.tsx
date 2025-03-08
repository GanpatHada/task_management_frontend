import React from 'react'
import './Navbar.css'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Navbar:React.FC = () => {
  const navigate=useNavigate();

  const handleLogout =() =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    navigate("/login");
  }
  return (
    <Container id='navbar' maxWidth={false} disableGutters>
         <Typography sx={{color:'white'}} variant='h5'>Task Master</Typography>
         <Button
          onClick={handleLogout}
         variant="contained" sx={{color:'purple',backgroundColor:'white'}}>Logout</Button>
    </Container>
  )
}

export default Navbar
