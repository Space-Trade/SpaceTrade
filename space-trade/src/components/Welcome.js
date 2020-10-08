import React from 'react';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const WelcomeStyle = styled.div`
  z-index: 1000000;
`;

const Welcome = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const userId = localStorage.getItem('userId');
  const fullname = localStorage.getItem('name');

  if (userId) return (
    <WelcomeStyle>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Welcome!, you are logged in as <b>{fullname}</b>.
                </Alert>
      </Snackbar>
    </WelcomeStyle>
  );
  return (
    <div>
      <Alert severity="warning">
        You are not logged in. Log in to unleash your full potential!
            </Alert>
    </div>
  );
}
export default Welcome;