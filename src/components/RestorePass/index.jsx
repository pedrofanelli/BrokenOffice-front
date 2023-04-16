import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router';
import { axiosPostRestorePass } from '../../utils/axios';

const RestorePass = () => {
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (pass1 !== pass2) return toast.error("Both passwords must be equal")
        if (!pass1 || !pass2) return toast.error("You need to complete both fields")
        if (pass1.length < 4) return toast.error("Write a more secure password")
        try {
            const updatedPass = await axiosPostRestorePass(token, pass1)
            if (updatedPass.error) return
            toast.success("Password updated!")
            navigate("/login")
        } catch (error) {
            toast.error("Invalid credentials");
        }
    }

  return (
    <Container component="main">
    <Box sx={{
        marginTop: 6,
        minHeight: '88vh'
      }}>
        <Typography component="h1" variant='h4' sx={{color: 'text.primary',fontWeight: '600', mb:'1rem'}}>
      Restore your password
        </Typography>
        <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, maxWidth: '35rem', margin: '0 auto' }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password1"
                  label="New password"
                  type={showPassword1 ? "text" : "password"}
                  id="password1"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end" onClick={() => setShowPassword1(i => !i)}>{showPassword1 ? <VisibilityIcon/> : <VisibilityOffIcon />}</InputAdornment>,
                  }}
                  onChange={(e) => setPass1(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Repeat password"
                  type={showPassword2 ? "text" : "password"}
                  id="password2"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end" onClick={() => setShowPassword2(i => !i)}>{showPassword2 ? <VisibilityIcon/> : <VisibilityOffIcon />}</InputAdornment>,
                  }}
                  onChange={(e) => setPass2(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Restore
                </Button>
                </Box>
    </Box>
    </Container>
  )
}

export default RestorePass