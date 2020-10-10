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
import Dashboard from "./components/dashboard/Dashboard"
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

var stocks = [
  {
    "name": "GOOGL",
    "amount": 10,
    "price": 100
  },
  {
    "name": "TSLA",
    "amount": 8,
    "price": 40
  }
];

function App() {
  localStorage.setItem('balance', 5000);
  localStorage.setItem('stocks', JSON.stringify(stocks));

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={MenuBar} />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/stocks/:stockId" component={Stock} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
        </Switch>
        <ChatBot />
      </Router>
    </ApolloProvider>
  );
}

export default App;