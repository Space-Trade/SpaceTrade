import React, { useState } from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Welcome from "./components/Welcome";
import MenuBar from "./components/MenuBar"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Stock from "./components/stock/Stock"
import ChatBot from "./components/chatbot/chatbotTheme";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./assets/logo.png";
import { ModalManager } from "@material-ui/core";

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={MenuBar} />
        <Route path="/" component={Welcome} />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/stocks/:stockId" component={Stock} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
        </Switch>
        <Footer />
        <ChatBot/>
      </Router>
    </ApolloProvider>
  );
}

export default App;