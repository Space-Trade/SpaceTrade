import * as React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';

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

const RegisterForm = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div style={{ textAlign: "center" }}>
        <br />
        <Logo src={logo} />
        <br />
        <br />
        <Typography variant="h4">
          Register
      </Typography>
      </div>
      <br />
      <FormContainer>
        <CssTextField
          className={classes.margin}
          variant="outlined"
          id="fullname"
          label="Fullname"
        />
        <br />
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
        <CssTextField
          className={classes.margin}
          variant="outlined"
          id="repeatPassword"
          label="Repeat password"
          type="password"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        ><Link to="/dashboard">
            REGISTER
                  </Link>
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link to="/login">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </FormContainer>
      <br />
    </Container>
  );
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

export default RegisterForm;
