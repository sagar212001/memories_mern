import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Link, Box, IconButton, CardMedia } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post }) => {
  const dispatch = useDispatch() 

  const { title, message, creators, tags, selectedFile, likeCount, createdAt, _id } = post;

  const [ liked, setLiked ] = useState(false)

  const onDelete = () => {
    dispatch(deletePost(_id))
  }

  const onEdit = () => {
    console.log('12345')
  }

  const postLike = () => {

    dispatch(likePost(_id, {'liked' : !liked}))
    setLiked(!liked)

  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>

          <IconButton onClick={onEdit} edge="end">
            <EditIcon />
          </IconButton>

          <IconButton onClick={onDelete} edge="end">
            <DeleteIcon color="error" />
          </IconButton>
        </Box>

        {/* Post Message */}
        <Typography variant="body1" color="text.secondary" paragraph>
          {message}
        </Typography>

        {/* Post Creators */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.primary" mr={1}>
            <strong>Creators:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {creators}
          </Typography>
        </Box>

        {/* Post Tags */}
        <Box mb={2}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            <strong>Tags:</strong>
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ margin: '2px' }} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No tags
              </Typography>
            )}
          </Box>
        </Box>

        {/* Post File */}
        {/* {selectedFile && (
          <Box mb={2}>
            <img src={selectedFile} alt="Base64" />
          </Box>
        )} */}

        {/* Post Like Count */}
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton 
            onClick={postLike} 
            color={liked ? 'primary' : 'default'} 
            sx={{ marginRight: 1 }}  // Add some spacing between buttons
          >
          <ThumbUp sx={{ marginRight: 1 }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likeCount} Likes
          </Typography>
        </Box>

        {/* Post Creation Date */}
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;

