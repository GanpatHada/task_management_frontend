import React from 'react'
import './Navbar.css'
import { Button, Container, Typography } from '@mui/material'
const Navbar:React.FC = () => {

  const handleLogout =() =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
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
