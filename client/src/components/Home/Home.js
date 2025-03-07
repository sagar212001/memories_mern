import React, { useEffect } from 'react'
import { Grow, Grid2, Container, Paper, AppBar, TextField, Button } from '@mui/material'
import Posts from '../../components/Posts/Posts'
import Forms from '../../components/Form/Forms'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Paginate from '../Pagination'

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
              <Paper elevation={6} sx={{marginBottom: 3, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Paginate />
              </Paper>
            </Grid2>
          </Grid2>
        </Container>
      </Grow>
  )
}

export default Home