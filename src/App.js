import React, { Fragment } from 'react';
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import PostContextProvider from './contexts/PostContextProvider';
import AlertContextProvider from './contexts/AlertContextProvider';

import Home from './screens/Home';
import CreatePost from './screens/CreatePost';

import CustomAppBar from './components/CustomAppBar';
import CustomAlert from './components/CustomAlert';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  containerHeight: {
    height: 'auto',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <AlertContextProvider>
          <PostContextProvider>
            {/* GRID-CHILD-1   */}
            <Grid className={classes.root} container>
              <CustomAppBar />
              {/* GRID-CHILD-2   */}
              <Grid
                className={classes.containerHeight}
                item
                lg={10}
                md={10}
                xs={11}
              >
                <CssBaseline />
                <Switch>
                  <Route path='/createPost' component={CreatePost} />
                  <Route path='/' exact component={Home} />
                </Switch>
              </Grid>
            </Grid>
            <CustomAlert />
          </PostContextProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
