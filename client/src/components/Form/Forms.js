import React, { useState, useEffect, use } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import base64 from 'base64-encode-file'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

const Forms = () => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: null,
  });

  const [error, setError] = useState('');

  useEffect(() =>{
    console.log('formData???', formData);
    

  },[formData])

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = async (e) => {

    console.log('e.target.files[0]???', e.target.files[0])
    setFormData({
      ...formData,
      selectedFile: await base64(e.target.files[0]),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.creator || !formData.title || !formData.message || !formData.tags || !formData.selectedFile) {
      setError('All fields are required!');
      return;
    }

    setError('');
    
    dispatch(createPost(formData))
  };

  // Clear the form fields
  const handleClear = () => {
    setFormData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    });
    setError('');
    window.location.reload()
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
      <Typography variant="h5" sx={{ fontSize: '1.2rem', marginBottom: 2 }}>
        Posting a memory
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Creator"
          variant="outlined"
          name="creator"
          value={formData.creator}
          onChange={handleChange}
          margin="normal"
          sx={{
            marginBottom: 2,
            '& .MuiInputBase-root': { fontSize: '0.875rem' },
          }}
          size="small"
        />

        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          sx={{
            marginBottom: 2,
            '& .MuiInputBase-root': { fontSize: '0.875rem' },
          }}
          size="small"
        />

        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          sx={{
            marginBottom: 2,
            '& .MuiInputBase-root': { fontSize: '0.875rem' },
          }}
          size="small"
          multiline
          rows={4}
        />

        <TextField
          fullWidth
          label="Tags"
          variant="outlined"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          margin="normal"
          sx={{
            marginBottom: 2,
            '& .MuiInputBase-root': { fontSize: '0.875rem' },
          }}
          size="small"
        />

        <div>
            <input type="file" name="file" onChange={handleFileChange}/>  
        </div>

        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{ fontSize: '0.875rem' }}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontSize: '0.875rem' }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Forms;
