import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Homepage';
import RegisterForm from '../RegisterForm';

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

export default App;