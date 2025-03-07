import { Container } from '@mui/material'
import React from 'react'
const Footer:React.FC = () => {
  return (
    <Container sx={{background:'purple',color:'whitesmoke',textAlign:'center',py:2}} maxWidth={false} disableGutters>
        this is footer of taskmaster app
    </Container>
  )
}

export default Footer
