import React from 'react'
import { TextField , Grid2, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Input = ({ name, label, type, autoFocus, handleChange, handleShowPassowrd, half }) => {
  return (
    <Grid2 item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' && {
                endAdorment : (
                    <IconButton onClick={handleShowPassowrd}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                )
            }}
            style={{
                height: '40px',
                marginBottom: '15px',
            }}
            sx={{
            '& .MuiInputBase-root': {
                height: '40px',
            },
            }}
        />

    </Grid2>
  )
}

export default Input