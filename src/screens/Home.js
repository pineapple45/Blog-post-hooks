import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';

import DeleteBtn from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { PostContext } from '../contexts/PostContextProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { state: posts, stateUpdateFunctions } = useContext(PostContext);
  const { deletePostHandler } = stateUpdateFunctions;

  return (
    <Grid container spacing={3}>
      {posts.length === 0 ? (
        <Grid item lg={12} md={12} sm={12}>
          <Typography variant='h6' color='textPrimary' component='h6'>
            No Post to show. Maybe add a few from app bar!
          </Typography>
        </Grid>
      ) : (
        posts.map((tile) => (
          <Grid key={tile._id} item lg={4} md={6} sm={12}>
            <Card>
              <CardHeader
                avatar={<Avatar alt={tile._id} src={tile.profileImgUrl} />}
                title={tile.username}
                action={
                  <IconButton
                    onClick={deletePostHandler.bind(this, tile._id)}
                    aria-label='settings'
                  >
                    <DeleteBtn />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant='h6' color='textPrimary' component='h3'>
                  <strong>{tile.postTitle}</strong>
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {tile.postDetails}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Home;
