import React, { useState, useContext } from 'react';
import { TextField, Grid, Button, Paper, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PostContext } from '../contexts/PostContextProvider';
import { AlertContext } from '../contexts/AlertContextProvider';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // flexGrow: 1,
  },
  labelContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '10px',
  },
  label: {
    margin: '5px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const [labels, setLabels] = useState([]);

  const { stateUpdateFunctions } = useContext(PostContext);
  const { createPostHandler } = stateUpdateFunctions;

  const { alert, setAlert } = useContext(AlertContext);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    createPostHandler(username, profileImgUrl, postTitle, postDetails, labels);
    setUsername('');
    setProfileImgUrl('');
    setPostTitle('');
    setPostDetails('');
    setLabels([]);
    history.push('/');
    setAlert({
      ...alert,
      showAlert: true,
      message: 'Post created successfully',
    });
  };

  const deleteChipHandler = (key) => {
    const filteredLabels = labels.filter((label) => label.key !== key);
    setLabels(filteredLabels);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={4} sm={12}>
        <TextField
          label='Username'
          id='username-textfeild'
          value={username}
          className={classes.textField}
          helperText='Enter your username'
          margin='normal'
          variant='outlined'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </Grid>

      <Grid item lg={8} md={8} sm={12}>
        <TextField
          label='Profile-Image'
          id='profile-url-textfield'
          value={profileImgUrl}
          className={classes.textField}
          helperText='Enter profile image url link'
          margin='normal'
          variant='outlined'
          onChange={(event) => setProfileImgUrl(event.target.value)}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <TextField
          label='Post-Title'
          id='post-title-textfeild'
          value={postTitle}
          className={classes.textField}
          helperText='Enter Post Title'
          margin='normal'
          variant='outlined'
          onChange={(event) => setPostTitle(event.target.value)}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <TextField
          id='post-details-textfeild'
          label='Post-Body'
          multiline
          rows={7}
          value={postDetails}
          className={classes.textField}
          helperText='Enter Post Body'
          variant='outlined'
          margin='normal'
          onChange={(event) => setPostDetails(event.target.value)}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <Paper component='ul' className={classes.labelContainer}>
          {labels.length === 0 ? (
            <p>Enter space seperated tags below</p>
          ) : (
            labels.map((data) => {
              return (
                <li key={data.key} className={classes.label}>
                  <Chip
                    label={data.label}
                    onDelete={deleteChipHandler.bind(this, data.key)}
                    className={classes.chip}
                  />
                </li>
              );
            })
          )}
        </Paper>
        <TextField
          label='Labels'
          id='post-labels-textfeild'
          defaultValue={labels.join(' ')}
          className={classes.textField}
          helperText='Enter Post Labels'
          margin='normal'
          variant='outlined'
          onChange={(event) =>
            setLabels(
              event.target.value.split(' ').map((label) => {
                return {
                  key: uniqid(),
                  label: label,
                };
              })
            )
          }
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <Button
          onClick={handlePostSubmit}
          variant='contained'
          color='secondary'
        >
          CREATE POST
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreatePost;
