import React from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <GoogleOAuthProvider clientId={'855497787281-h79gieka042gd64b0grvomcqqshke2g4.apps.googleusercontent.com'}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/search' element={<Home />} />
            <Route path='/posts/:id' element={<Home />} />
            <Route path="/auth" element={user ? <Navigate to="/posts" /> : <Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
    
  )
}

export default App;
