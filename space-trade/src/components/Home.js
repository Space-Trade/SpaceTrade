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

const Logo = styled.img`
  margin-top: 40%;
  height: auto;
  object-fit: contain;
`;

const Home = () => {
    return (
        <Container maxWidth="sm">
            <div style={{ textAlign: "center" }}>
                <br />
                <Logo src={logo} />
                <br />
            </div>
        </Container>
    );
};

export default Home;
