import './App.css';
import { Container} from 'react-bootstrap'
import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ApolloProvider from './ApolloProvider'

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  

  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          {/* <Register /> */}
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
