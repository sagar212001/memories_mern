import React, { useEffect } from 'react'
import { Grow, Grid2, AppBar, Container, Typography } from '@mui/material'
import Posts from './components/Posts/Posts'
import Forms from './components/Form/Forms'
import useStyles from './styles'
import { useDispatch } from 'react-redux'

import { getPosts } from './actions/posts'

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  })


  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h4' align='center'>
          Memories
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid2 container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid2 item xs={12} sm={7}>
              <Posts />
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <Forms />
            </Grid2>
          </Grid2>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;
