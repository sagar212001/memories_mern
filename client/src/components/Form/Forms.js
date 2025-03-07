import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import base64 from 'base64-encode-file'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatedPostIndex, updatePost } from '../../actions/posts';

const Forms = () => {

  const dispatch = useDispatch()

  const INITIAL_DATA = {
    title: '',
    message: '',
    tags: '',
    selectedFile: null,
  }

  const [formData, setFormData] = useState(INITIAL_DATA);

  const [error, setError] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const updateIndex = useSelector((state) => state?.posts?.updateIndex)
  const user = JSON.parse(localStorage.getItem('profile'))
  
  useEffect(() =>{
    if(post)
    {
      setFormData(post)
    }

  },[post])
  
  useEffect(() => {
    if(updateIndex){
      setCurrentId(updateIndex)
    }else{
      setCurrentId(updateIndex)
      setFormData(INITIAL_DATA)
    }
  }, [ updateIndex ])

  // Handle input changes
  const handleChange = (e) => {
    const value = e.target.name === 'tags' ? e.target.value.split(',') : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const fileInputRef = useRef(null) || {};


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
    if (!formData.title || !formData.message || !formData.tags || !formData.selectedFile) {
      setError('All fields are required!');
      return;
    }

    setError('');
    
    updateIndex ? dispatch(updatePost(updateIndex, formData)) : dispatch(createPost({ ...formData, name : user?.result?.name }))
    handleClear()
  };

  // Clear the form fields
  const handleClear = () => {
    setFormData(INITIAL_DATA);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError('');
    if(updateIndex){
      dispatch(updatedPostIndex(null))
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
      <Typography variant="h5" sx={{ fontSize: '1.2rem', marginBottom: 2 }}>
        {updateIndex ? 'Editing A memory' : 'Posting a memory' }
      </Typography>

      <form onSubmit={handleSubmit}>
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
            <input type="file" name="file" onChange={handleFileChange} ref={fileInputRef} />  
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
            onClick={() => handleClear()}
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
            {updateIndex ? 'Edit' : 'Submit' }
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Forms;
