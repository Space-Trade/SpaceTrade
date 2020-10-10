import * as React from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import logo from "../assets/logo.png";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import {
  Link
} from "react-router-dom";
import {
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3f51b5',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3f51b5',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3f51b5',
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3f51b5',
      },
    },
  },
})(TextField);

const LoginForm = () => {
  const classes = useStyles();
  var show = true;

  if ({ show }) {
    return (
      <Container maxWidth="sm">
        <div style={{ textAlign: "center" }}>
          <br />
          <Logo src={logo} />
          <br />
          <br />
          <Typography variant="h4">
            Login
        </Typography>
        </div>
        <br />
        <div>
          <FormContainer>
            <CssTextField
              className={classes.margin}
              variant="outlined"
              id="email"
              label="Email"
            />
            <br />
            <CssTextField
              className={classes.margin}
              variant="outlined"
              id="password"
              label="Password"
              type="password"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
            ><Link to="/dashboard">
                LOGIN
              </Link>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/register">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={{
                  pathname: "/register",
                  state: { hola: true }
                }} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </FormContainer>
        </div>
        <br />
      </Container>
    );
  }
  return (<></>);
};

const Logo = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withRouter(LoginForm);
