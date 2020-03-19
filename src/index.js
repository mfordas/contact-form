import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './frontend/views/Homepage';
import RegisterForm from './frontend/views/RegisterForm';

const App = () => {

  

  

  return (
    <BrowserRouter>
        <Home/>
        <Switch>
          <Route exact path="/" component={RegisterForm} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
    </BrowserRouter>
  );
};


ReactDOM.render(
    <App />,
  document.querySelector('#root')
);
