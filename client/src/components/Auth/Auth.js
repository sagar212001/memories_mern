import React, { useState } from 'react';
import { Button, Typography, Container, Grid2, Box, Paper, Avatar} from '@mui/material';
import { LockPersonOutlined } from '@mui/icons-material'
import Input from './Input'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../actions/auth';

const initialState = {
  firstName : '',
  lastName : '', 
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ showPassword , setShowPassword ] = useState(false)
  const [ isSignUp , setIsSignUp ] = useState(false)
  const [ formData, setFormData ] = useState(initialState)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(isSignUp){
      dispatch(signUp(formData, navigate))
    }
    else{
      dispatch(signIn(formData, navigate))
    }

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value})
  }

  const googleSuccess = async (res) => {
    const result = res?.clientId
    const token = jwtDecode(res?.credential)

    try {
        dispatch({ type: 'AUTH', data: { result, token }})

        navigate('/')
    } catch (error) {
        console.log(error)
    }

  }

  const googleFailure = () => {
    console.log('Try Again Later')

  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setShowPassword(false)
  }

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar style={{ backgroundColor: '#3f51b5', marginBottom: '10px' }}>
          <LockPersonOutlined />
        </Avatar>
        <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isSignUp && (
              <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus fullWidth />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} fullWidth />
              </>
            )}
              <Input name="email" label="Email" handleChange={handleChange} type="email" fullWidth />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth />
            {isSignUp && (
                <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" fullWidth />
            )}
              <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid2 container justifyContent='flex-end'>
                <Grid2 item>
                    {!isSignUp && 
                        <GoogleLogin 
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            />
                    }
                </Grid2>
              </Grid2>
              <Grid2 container justifyContent='flex-end'>
                <Grid2 item>
                    <Button onClick={switchMode}> 
                        {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account ? SignUp'}
                    </Button>
                </Grid2>
              </Grid2>
        </form>
      </Paper>
    </Container>
  )
};

export default Auth;
