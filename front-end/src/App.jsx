import './App.css';
import { Container} from 'react-bootstrap'
import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ApolloProvider from './ApolloProvider'

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DynamicRoute from './utils/DynamicRoute'

import { AuthProvider} from './context/auth'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            {/* <Register /> */}
            <Switch>
              <DynamicRoute path="/register" component={Register} guest></DynamicRoute>
              <DynamicRoute path="/login" component={Login} guest></DynamicRoute>
              <DynamicRoute path="/" exact component={Home} authenticated></DynamicRoute>
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
