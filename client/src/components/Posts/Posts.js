import React, { useEffect } from 'react'
import { Grid2, CircularProgress } from '@mui/material';
import Post from './Post/Post'
import { useSelector } from 'react-redux'

const Posts = () => {

  const posts = useSelector((state) => state.posts.posts)
  const updateIndex = useSelector((state) => state.posts.updateIndex)
  
  useEffect(() => {
    console.log('updateIndex IN POSTS',updateIndex)
  
  }, [updateIndex])
  

  console.log(posts);
  

  return (
    !posts.length 
    ? (<CircularProgress />)
    : (<Grid2 container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid2
            item
            xs={12}  // 1 column on mobile
            sm={6}   // 2 columns on medium screen
            key={post._id}
          >
            <Post post={post}/>
          </Grid2>
        ))}
      </Grid2>)
  );
}

export default Posts

