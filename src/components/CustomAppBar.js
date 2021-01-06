import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => {
  return {
    root: {
      marginBottom: '30px',
    },
    navigationLinks: {
      marginLeft: 'auto',
    },
    linkItem: {},
    title: {
      cursor: 'pointer',
    },
  };
});

const CustomAppBar = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid className={classes.root} item lg={12} md={12} xs={12}>
      <AppBar color='secondary' position='sticky'>
        <Toolbar variant='dense'>
          <Typography
            variant='h5'
            onClick={() => {
              history.push('/');
            }}
            className={classes.title}
          >
            Grid Blog
          </Typography>
          <List component='nav' className={classes.navigationLinks}>
            <ListItem
              button
              onClick={() => {
                history.push('/createPost');
              }}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary='Create Post' />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default CustomAppBar;
