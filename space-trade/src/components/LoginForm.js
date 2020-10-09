import * as React from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import logo from "../assets/logo.png";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
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

const validations = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Password is required')
})

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {      
      ok,
      error,
      user {
        id,
        fullname,
        email,
        password 
      }
    }
  }
`;

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
  const [errorState, setErrorState] = React.useState('');
  const [login, { loading, error }] = useMutation(LOGIN);
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
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validations}
          onSubmit={(values, { setSubmitting }) => {
            setErrorState('');

            login({
              variables: {
                input: values
              },
            }).then(({ data }) => {
              if (data.login.ok) {
                localStorage.setItem('userId', data.login.user.id);
                localStorage.setItem('name', data.login.user.fullname);
                show = false;
                window.location.assign("http://space-trade.vercel.app/dashboard");
              }
              else {
                setErrorState(data.login.error);
                setSubmitting(false);
              }
            }).catch((e) => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values, errors, touched, handleChange, handleSubmit, isSubmitting
          }) => (
              <div>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <FormContainer>
                    <CssTextField
                      className={classes.margin}
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={errors.email && touched.email ? errors.email : ' '}
                      id="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                    <br />
                    <CssTextField
                      className={classes.margin}
                      variant="outlined"
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password ? errors.password : ' '}
                      id="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange("password")}
                    />
                    <br />
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      LOGIN
                    </Button>

                    <Grid container>
                      <Grid item xs>
                        <Link to="/register">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link to="/register">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>

                  </FormContainer>
                </form>
                {loading &&
                  <Row className="justify-content-md-center">
                    <Spinner animation="border" />
                  </Row>}
                {error && <p>Error</p>}
                {errorState && <p>{errorState}</p>}
              </div>
            )}
        </Formik>
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
