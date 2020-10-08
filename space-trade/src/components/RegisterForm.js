import * as React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const REGISTER_MUTATION = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
      fullname
      email
    }
  }
`;

const validations = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  repeatPassword: Yup.string()
    .test(
      'Match',
      "Passwords don't match",
      function (repeatPassword) {
        return repeatPassword === this.parent.password;
      })
})

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
  const [register] = useMutation(REGISTER_MUTATION);

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
      <Formik
        initialValues={{ fullname: '', email: '', password: '', repeatPassword: '' }}
        validationSchema={validations}
        onSubmit={({ repeatPassword, ...values }, { setSubmitting }) => {
          setTimeout(() => {
            register({
              variables: {
                input: values
              },
            }).then((result) => {
              window.history.back();
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values, errors, touched, handleChange, handleSubmit, isSubmitting
        }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormContainer>
                <CssTextField
                  className={classes.margin}
                  variant="outlined"
                  error={errors.fullname && touched.fullname}
                  helperText={errors.fullname && touched.fullname ? errors.fullname : ' '}
                  id="fullname"
                  label="Fullname"
                  value={values.fullname}
                  onChange={handleChange("fullname")}
                />
                <br />
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
                <CssTextField
                  className={classes.margin}
                  variant="outlined"
                  error={errors.repeatPassword && touched.repeatPassword}
                  helperText={errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ' '}
                  id="repeatPassword"
                  label="Repeat password"
                  type="password"
                  value={values.repeatPassword}
                  onChange={handleChange("repeatPassword")}
                />
                <br />
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  REGISTER
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
            </form>
          )}
      </Formik>
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
