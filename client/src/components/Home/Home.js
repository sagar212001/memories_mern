import React, { useEffect } from 'react'
import { Grow, Grid2, Container } from '@mui/material'
import Posts from '../../components/Posts/Posts'
import Forms from '../../components/Form/Forms'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'


const Home =() => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getPosts())
    }, [ dispatch ])

  return (
    <Grow in>
        <Container>
          <Grid2 container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid2 item xs={12} sm={7}>
              <Posts/>
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <Forms/>
            </Grid2>
          </Grid2>
        </Container>
      </Grow>
  )
}

export default Home