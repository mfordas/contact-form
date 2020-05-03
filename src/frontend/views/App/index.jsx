import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from '../Homepage';
import RegisterForm from '../RegisterForm';
import store from '../../store';


const App = () => {

  return (
    <Provider store={store}>
    <BrowserRouter>
        <Home/>
        <Switch>
          <Route exact path="/" component={RegisterForm} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
    </BrowserRouter>
    </Provider>
  );
};

export default App;