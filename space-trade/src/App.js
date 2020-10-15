import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/dashboard/Dashboard"
import Stock from "./components/stock/Stock"
import ChatBot from "./components/chatbot/chatbotTheme";
import { BrowserRouter as Router, Switch, Route, useLocation, useState } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useEffect } from 'react';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import VerticalMenu from "./components/VerticalMenu/VerticalMenu";
import Help from "./components/Help/Help"
import Portfolio from "./components/Portfolio/Portfolio"
import LayoutDefault from './layouts/LayoutDefault';
import Home from './views/Home';

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

var stocks = [
  {
    "name": "GOOGL",
    "amount": 10,
    "price": 100
  },
  {
    "name": "REPL",
    "amount": 8,
    "price": 40
  },
  {
    "name": "MDRX",
    "amount": 3,
    "price": 90
  },
  {
    "name": "VOXX",
    "amount": 1,
    "price": 20
  },
  {
    "name": "BAC",
    "amount": 12,
    "price": 423
  },
  {
    "name": "TSLA",
    "amount": 2,
    "price": 100
  },
  {
    "name": "AMD",
    "amount": 16,
    "price": 567
  },
  {
    "name": "AAL",
    "amount": 1,
    "price": 9
  }
];

const App = () => {
  if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', 5000);
  }
  if (!localStorage.getItem('stocks')) {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <>
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <Route path="/dashboard">
              <VerticalMenu />
              <Dashboard />
              <ChatBot />
            </Route>
            <Route path="/portfolio">
              <VerticalMenu />
              <Portfolio />
              <ChatBot />
            </Route>
            <Route path="/help">
              <VerticalMenu />
              <Help />
              <ChatBot />
            </Route>
            <Route path="/stocks/:stockId">
              <VerticalMenu />
              <Stock />
              <ChatBot />
            </Route>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
          </Switch>
        </>
      )} />
  );
}

export default App;