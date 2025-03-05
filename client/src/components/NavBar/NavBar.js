import React, { useState, useEffect } from 'react'
import { AppBar, Heading } from '../../styles'
import { Toolbar, Avatar, Typography, Button, Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png'

const NavBar= () => {


  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('profile')))

  },[ location, user ])

  const onHandleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    setUser(null)
    navigate('/auth', { replace: true });
  }

  return (
    <AppBar position='static' color='inherit'>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading variant='h4' align='center'>
            Memories
            </Heading>
        </Container>
        <Toolbar sx = {{display: 'flex', justifyContent: 'flex-end' }}>
          { user ? (
            <div sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar alt={user?.token?.name} src={user?.token?.picture}>{user?.token?.name?.charAt(0)} </Avatar>
              <Typography variant='h6'>{user?.token?.name}</Typography>
              <Button variant='contained' color="secondary" onClick={onHandleLogout}> Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary" > Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
  )
}

export default NavBar
